from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_sqlalchemy import SQLAlchemy
import requests
import json
import os
from datetime import datetime, timedelta
import secrets
import string
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
import base64
import qrcode
import io
import routeros_api
import subprocess
import ipaddress
import math
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from models import db, User, WireGuardServer, WireGuardPeer, StaticRoute

app = Flask(__name__)

# Load configuration
def load_config():
    # Railway deployment - use environment variables
    if os.environ.get('RAILWAY_ENVIRONMENT'):
        return {
            "mikrotik": {
                "host": os.environ.get('MIKROTIK_HOST', '192.168.1.1'),
                "username": os.environ.get('MIKROTIK_USERNAME', 'admin'), 
                "password": os.environ.get('MIKROTIK_PASSWORD', 'admin'),
                "port": int(os.environ.get('MIKROTIK_PORT', '443'))
            },
            "app": {
                "secret_key": os.environ.get('SECRET_KEY', 'your-secret-key-change-this'),
                "jwt_secret": os.environ.get('JWT_SECRET', 'jwt-secret-key-change-this'),
                "debug": False,
                "host": "0.0.0.0",
                "port": int(os.environ.get('PORT', '5000'))
            },
            "database": {
                "uri": os.environ.get('DATABASE_URL', 'sqlite:///wireguard.db')
            },
            "email": {
                "smtp_server": os.environ.get('SMTP_SERVER', 'smtp.gmail.com'),
                "smtp_port": int(os.environ.get('SMTP_PORT', '587')),
                "email": os.environ.get('EMAIL_ADDRESS', 'your-email@gmail.com'),
                "password": os.environ.get('EMAIL_PASSWORD', 'your-app-password'),
                "from_name": os.environ.get('EMAIL_FROM_NAME', 'VPN Service')
            }
        }
    
    # Local development - use config.json
    config_path = os.path.join(os.path.dirname(__file__), 'config.json')
    if os.path.exists(config_path):
        with open(config_path, 'r') as f:
            return json.load(f)
    else:
        # Return default config if file doesn't exist
        return {
            "mikrotik": {
                "host": "192.168.1.1",
                "username": "admin", 
                "password": "admin",
                "port": 443
            },
            "app": {
                "secret_key": "your-secret-key-change-this",
                "jwt_secret": "jwt-secret-key-change-this",
                "debug": True,
                "host": "0.0.0.0",
                "port": 5000
            },
            "database": {
                "uri": "sqlite:///wireguard.db"
            },
            "email": {
                "smtp_server": "smtp.gmail.com",
                "smtp_port": 587,
                "email": "your-email@gmail.com",
                "password": "your-app-password",
                "from_name": "VPN Service"
            }
        }

config = load_config()

app.config['SECRET_KEY'] = config['app']['secret_key']
app.config['SQLALCHEMY_DATABASE_URI'] = config['database']['uri']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = config['app']['jwt_secret']
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

CORS(app)
jwt = JWTManager(app)
db.init_app(app)

# Add CORS headers for all routes
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# MikroTik API Helper
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.host = host
        self.username = username
        self.password = password
        self.port = port
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # For self-signed certificates
        self.session.auth = (username, password)
        
        # Test connection on initialization
        try:
            test_response = self.session.get(f"{self.base_url}/system/resource")
            if test_response.status_code != 200:
                raise Exception(f"MikroTik API error: {test_response.status_code}")
        except Exception as e:
            print(f"MikroTik connection test failed: {e}")
            raise e
    
    def create_wireguard_interface(self, name, private_key, listen_port):
        """Create WireGuard interface on MikroTik"""
        data = {
            "name": name,
            "private-key": private_key,
            "listen-port": listen_port,
            "mtu": 1420
        }
        response = self.session.put(f"{self.base_url}/interface/wireguard", json=data)
        return response.json() if response.status_code == 200 else None
    
    def create_wireguard_peer(self, interface_name, public_key, allowed_ips):
        """Create WireGuard peer on MikroTik"""
        data = {
            "interface": interface_name,
            "public-key": public_key,
            "allowed-address": allowed_ips
        }
        response = self.session.post(f"{self.base_url}/interface/wireguard/peers", json=data)
        return response.json() if response.status_code == 200 else None
    
    def delete_wireguard_peer(self, public_key):
        """Delete WireGuard peer from MikroTik by public key"""
        # Prvo nađi peer po public key-u
        response = self.session.get(f"{self.base_url}/interface/wireguard/peers")
        if response.status_code == 200:
            peers = response.json()
            peer_id = None
            for peer in peers:
                if peer.get('public-key') == public_key:
                    peer_id = peer.get('id')
                    break
            
            if peer_id:
                delete_response = self.session.delete(f"{self.base_url}/interface/wireguard/peers/{peer_id}")
                return delete_response.status_code == 200
            else:
                print(f"Peer with public key {public_key} not found")
                return False
        return False
    
    def get_interface_stats(self, interface_name):
        """Get interface statistics"""
        response = self.session.get(f"{self.base_url}/interface/wireguard", 
                                  params={"name": interface_name})
        return response.json() if response.status_code == 200 else None

class MikroTikLegacyAPI:
    def __init__(self, host, username, password, port=8728):
        self.connection = routeros_api.RouterOsApiPool(
            host, username=username, password=password, port=port, plaintext_login=True
        )
        self.api = self.connection.get_api()

    def create_wireguard_interface(self, name, private_key, listen_port):
        try:
            self.api.get_resource('/interface/wireguard').add(
                name=name,
                private_key=private_key,
                listen_port=listen_port
            )
            return True
        except Exception as e:
            print(f"Legacy API error: {e}")
            return False

    def add_ip_address(self, address, interface_name):
        try:
            self.api.get_resource('/ip/address').add(
                address=address,
                interface=interface_name
            )
            return True
        except Exception as e:
            print(f"Legacy API IP error: {e}")
            return False

    def create_wireguard_peer(self, interface_name, public_key, allowed_ips, name=None, endpoint_port=None):
        try:
            params = {
                'interface': interface_name,
                'public_key': public_key,
                'allowed_address': allowed_ips
            }
            if name:
                params['name'] = name  # Koristi name kao glavno ime, ne comment
            if endpoint_port:
                params['endpoint_port'] = str(endpoint_port)
            self.api.get_resource('/interface/wireguard/peers').add(**params)
            return True
        except Exception as e:
            print(f"Legacy API peer error: {e}")
            return False
    
    def update_peer_comment(self, public_key, new_name):
        """Update peer name on MikroTik"""
        try:
            # Prvo nađi peer po public key-u
            peers = self.api.get_resource('/interface/wireguard/peers').get()
            peer_id = None
            for peer in peers:
                if peer.get('public-key') == public_key:
                    peer_id = peer.get('id')
                    break
            
            if peer_id:
                self.api.get_resource('/interface/wireguard/peers').set(
                    id=peer_id,
                    name=new_name  # Koristi name umesto comment
                )
                return True
            else:
                print(f"Peer with public key {public_key} not found")
                return False
        except Exception as e:
            print(f"Legacy API update peer name error: {e}")
            return False

    def add_firewall_rule(self, port):
        try:
            self.api.get_resource('/ip/firewall/filter').add(
                chain='input',
                action='accept',
                protocol='udp',
                dst_port=str(port),
                comment=f'WG GUI auto port {port}'
            )
            return True
        except Exception as e:
            print(f"Legacy API FW error: {e}")
            return False
    def add_static_route(self, dst, gateway):
        try:
            self.api.get_resource('/ip/route').add(
                dst_address=dst,
                gateway=gateway,
                comment='WG GUI auto route'
            )
            return True
        except Exception as e:
            print(f"Legacy API route error: {e}")
            return False

    def disable_interface(self, interface_name):
        try:
            self.api.get_resource('/interface/wireguard').set(
                id=interface_name,
                disabled='yes'
            )
            return True
        except Exception as e:
            print(f"Legacy API disable interface error: {e}")
            return False

    def enable_interface(self, interface_name):
        try:
            self.api.get_resource('/interface/wireguard').set(
                id=interface_name,
                disabled='no'
            )
            return True
        except Exception as e:
            print(f"Legacy API enable interface error: {e}")
            return False

    def delete_interface(self, interface_name):
        try:
            self.api.get_resource('/interface/wireguard').remove(
                id=interface_name
            )
            return True
        except Exception as e:
            print(f"Legacy API delete interface error: {e}")
            return False

    def delete_peer(self, public_key):
        try:
            # Prvo nađi peer po public key-u
            peers = self.api.get_resource('/interface/wireguard/peers').get()
            peer_id = None
            for peer in peers:
                if peer.get('public-key') == public_key:
                    peer_id = peer.get('id')
                    break
            
            if peer_id:
                self.api.get_resource('/interface/wireguard/peers').remove(
                    id=peer_id
                )
                return True
            else:
                print(f"Peer with public key {public_key} not found")
                return False
        except Exception as e:
            print(f"Legacy API delete peer error: {e}")
            return False

    def get_wireguard_interfaces(self):
        """Retrieve all WireGuard interfaces from MikroTik with their addresses"""
        try:
            interfaces = self.api.get_resource('/interface/wireguard').get()
            if not interfaces:
                return []
            
            # Get IP addresses for each interface
            ip_addresses = self.api.get_resource('/ip/address').get()
            
            # Create a mapping of interface names to their addresses
            interface_addresses = {}
            if ip_addresses:
                for ip_addr in ip_addresses:
                    interface_name = ip_addr.get('interface')
                    if interface_name:
                        if interface_name not in interface_addresses:
                            interface_addresses[interface_name] = []
                        interface_addresses[interface_name].append(ip_addr.get('address', ''))
            
            # Add address information to interfaces
            for interface in interfaces:
                interface_name = interface.get('name')
                if interface_name in interface_addresses:
                    # Use the first address found for this interface
                    interface['address'] = interface_addresses[interface_name][0] if interface_addresses[interface_name] else '10.0.0.1/24'
                else:
                    interface['address'] = '10.0.0.1/24'  # Default fallback
            
            return interfaces
        except Exception as e:
            print(f"Error getting WireGuard interfaces: {e}")
            return []

    def get_wireguard_peers(self, interface_name):
        """Retrieve all peers for a specific WireGuard interface"""
        try:
            peers = self.api.get_resource('/interface/wireguard/peers').get()
            # Filter peers by interface
            return [peer for peer in peers if peer.get('interface') == interface_name] if peers else []
        except Exception as e:
            print(f"Error getting WireGuard peers for {interface_name}: {e}")
            return []

    def get_interface_status(self, interface_name):
        """Get detailed status for a WireGuard interface"""
        try:
            interfaces = self.api.get_resource('/interface/wireguard').get()
            if interfaces:
                for interface in interfaces:
                    if interface.get('name') == interface_name:
                        return interface
            return None
        except Exception as e:
            print(f"Error getting interface status for {interface_name}: {e}")
            return None

    def get_peer_status(self, interface_name, public_key):
        """Get detailed status for a specific WireGuard peer"""
        try:
            peers = self.api.get_resource('/interface/wireguard/peers').get()
            if peers:
                for peer in peers:
                    if (peer.get('interface') == interface_name and 
                        peer.get('public-key') == public_key):
                        return peer
            return None
        except Exception as e:
            print(f"Error getting peer status for {public_key} on {interface_name}: {e}")
            return None

# WireGuard Key Generation
def generate_wireguard_keys():
    """Generate valid WireGuard private and public keys using system wg tool"""
    try:
        # Koristi punu putanju do wg komande
        wg_path = '/usr/bin/wg'
        private_key = subprocess.check_output([wg_path, 'genkey']).strip().decode()
        public_key = subprocess.check_output([wg_path, 'pubkey'], input=private_key.encode()).strip().decode()
        return private_key, public_key
    except FileNotFoundError:
        # Fallback: generisi ključeve koristeći Python biblioteku
        print("Warning: wg command not found, using Python fallback")
        import secrets
        import base64
        from cryptography.hazmat.primitives.asymmetric import x25519
        from cryptography.hazmat.primitives import serialization
        
        # Generisi private key
        private_key_obj = x25519.X25519PrivateKey.generate()
        private_key = base64.b64encode(
            private_key_obj.private_bytes(
                encoding=serialization.Encoding.Raw,
                format=serialization.PrivateFormat.Raw,
                encryption_algorithm=serialization.NoEncryption()
            )
        ).decode()
        
        # Generisi public key
        public_key_obj = private_key_obj.public_key()
        public_key = base64.b64encode(
            public_key_obj.public_bytes(
                encoding=serialization.Encoding.Raw,
                format=serialization.PublicFormat.Raw
            )
        ).decode()
        
        return private_key, public_key

def format_bytes(bytes_value):
    """Format bytes into human readable format"""
    if bytes_value == 0:
        return "0 B"
    k = 1024
    sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    i = int(math.floor(math.log(bytes_value) / math.log(k)))
    return f"{bytes_value / math.pow(k, i):.2f} {sizes[i]}"

def generate_qr_code(config_data):
    """Generate QR code for WireGuard configuration"""
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(config_data)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    img_buffer = io.BytesIO()
    img.save(img_buffer, format='PNG')
    img_buffer.seek(0)
    
    return base64.b64encode(img_buffer.getvalue()).decode('utf-8')

def send_verification_email(email, username, verification_token):
    """Send verification email to user"""
    try:
        msg = MIMEMultipart()
        msg['From'] = f"{config['email']['from_name']} <{config['email']['email']}>"
        msg['To'] = email
        msg['Subject'] = "Verifikacija VPN naloga"
        
        verification_url = f"http://localhost:3000/verify/{verification_token}"
        
        body = f"""
        Zdravo {username}!
        
        Hvala vam na registraciji na našu VPN platformu.
        
        Da biste aktivirali svoj nalog, molimo kliknite na sledeći link:
        {verification_url}
        
        Ako niste vi kreirali ovaj nalog, možete ignorisati ovaj email.
        
        Srdačan pozdrav,
        VPN Service Team
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        server = smtplib.SMTP(config['email']['smtp_server'], config['email']['smtp_port'])
        server.starttls()
        server.login(config['email']['email'], config['email']['password'])
        text = msg.as_string()
        server.sendmail(config['email']['email'], email, text)
        server.quit()
        
        return True
    except Exception as e:
        print(f"Email sending error: {e}")
        return False

def hash_password(password):
    """Hash password using bcrypt-like approach"""
    import hashlib
    salt = secrets.token_hex(16)
    hash_obj = hashlib.sha256()
    hash_obj.update((password + salt).encode())
    return f"{salt}${hash_obj.hexdigest()}"

def verify_password(password, password_hash):
    """Verify password against hash"""
    import hashlib
    try:
        salt, hash_value = password_hash.split('$')
        hash_obj = hashlib.sha256()
        hash_obj.update((password + salt).encode())
        return hash_obj.hexdigest() == hash_value
    except:
        return False

# Routes
@app.route('/api/test-mikrotik', methods=['POST'])
def test_mikrotik_connection():
    """Test connection to MikroTik CHR"""
    try:
        # Test basic connection
        mikrotik = MikroTikAPI(
            host=config['mikrotik']['host'],
            username=config['mikrotik']['username'],
            password=config['mikrotik']['password'],
            port=config['mikrotik']['port']
        )
        
        # Test API connection by getting system resource info
        response = mikrotik.session.get(f"{mikrotik.base_url}/system/resource")
        
        if response.status_code == 200:
            return jsonify({
                'success': True,
                'message': 'MikroTik connection successful',
                'system_info': response.json()
            })
        else:
            return jsonify({
                'success': False,
                'message': f'MikroTik API error: {response.status_code}',
                'error': response.text
            }), 400
            
    except requests.exceptions.ConnectionError:
        return jsonify({
            'success': False,
            'message': 'Cannot connect to MikroTik. Check host and port.',
            'error': 'Connection failed'
        }), 400
    except requests.exceptions.HTTPError as e:
        return jsonify({
            'success': False,
            'message': 'Authentication failed. Check username and password.',
            'error': str(e)
        }), 401
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Unexpected error: {str(e)}',
            'error': str(e)
        }), 500

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    # Validate input
    if not username or not email or not password:
        return jsonify({'error': 'Sva polja su obavezna'}), 400
    
    if len(username) < 3:
        return jsonify({'error': 'Korisničko ime mora imati najmanje 3 karaktera'}), 400
    
    if len(password) < 6:
        return jsonify({'error': 'Lozinka mora imati najmanje 6 karaktera'}), 400
    
    # Check if user already exists
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'error': 'Korisničko ime već postoji'}), 400
    
    existing_email = User.query.filter_by(email=email).first()
    if existing_email:
        return jsonify({'error': 'Email adresa već postoji'}), 400
    
    # Create verification token
    verification_token = secrets.token_urlsafe(32)
    
    # Hash password
    password_hash = hash_password(password)
    
    # Create user
    user = User(
        username=username,
        email=email,
        password_hash=password_hash,
        verification_token=verification_token,
        is_verified=False,
        is_admin=False
    )
    
    try:
        db.session.add(user)
        db.session.commit()
        
        # Send verification email
        if send_verification_email(email, username, verification_token):
            return jsonify({'message': 'Registracija uspešna! Proverite vaš email za verifikaciju.'})
        else:
            # If email fails, still create user but warn
            return jsonify({'message': 'Registracija uspešna, ali email verifikacija nije poslata. Kontaktirajte administratora.'})
            
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Greška pri registraciji'}), 500

@app.route('/api/verify/<token>', methods=['GET'])
def verify_email(token):
    user = User.query.filter_by(verification_token=token).first()
    
    if not user:
        return jsonify({'error': 'Nevažeći verifikacioni token'}), 400
    
    if user.is_verified:
        return jsonify({'message': 'Nalog je već verifikovan'}), 200
    
    user.is_verified = True
    user.verification_token = None
    db.session.commit()
    
    return jsonify({'message': 'Email uspešno verifikovan! Možete se prijaviti.'})

@app.route('/api/login', methods=['POST'])
def login():
    try:
        print(f"Login request headers: {dict(request.headers)}")
        print(f"Login request data: {request.get_data()}")
        
        data = request.get_json()
        print(f"Parsed JSON data: {data}")
        
        if not data:
            return jsonify({'error': 'Invalid JSON data'}), 400
        
        username = data.get('username')
        password = data.get('password')
        
        print(f"Username: {username}, Password: {password}")
        
        if not username or not password:
            return jsonify({'error': 'Username and password are required'}), 400
        
        user = User.query.filter_by(username=username).first()
        if user and verify_password(password, user.password_hash):
            if not user.is_verified:
                return jsonify({'error': 'Molimo verifikujte vaš email pre prijave'}), 401
            
            access_token = create_access_token(identity=username)
            return jsonify({
                'access_token': access_token,
                'username': username,
                'is_admin': user.is_admin
            })
        
        return jsonify({'error': 'Neispravni podaci za prijavu'}), 401
    except Exception as e:
        print(f"Login error: {e}")
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/api/servers', methods=['GET'])
@jwt_required()
def get_servers():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    
    try:
        # Get existing interfaces from MikroTik
        mikrotik_legacy = MikroTikLegacyAPI(
            host=config['mikrotik']['host'],
            username=config['mikrotik']['username'],
            password=config['mikrotik']['password'],
            port=8728
        )
        
        # Get all interfaces from MikroTik
        mikrotik_interfaces = mikrotik_legacy.get_wireguard_interfaces()
        mikrotik_interface_names = [interface['name'] for interface in mikrotik_interfaces]
        
        # Filter servers to only show those that exist on current MikroTik
        if user.is_admin:
            servers = WireGuardServer.query.filter(
                WireGuardServer.interface_name.in_(mikrotik_interface_names)
            ).all()
        else:
            servers = WireGuardServer.query.filter(
                WireGuardServer.user_id == user.id,
                WireGuardServer.interface_name.in_(mikrotik_interface_names)
            ).all()
        
        return jsonify([{
            'id': server.id,
            'name': server.name,
            'interface_name': server.interface_name,
            'listen_port': server.listen_port,
            'address': server.address,
            'is_active': server.is_active,
            'created_at': server.created_at.isoformat(),
            'peer_count': WireGuardPeer.query.filter_by(server_id=server.id, is_active=True).count()
        } for server in servers])
        
    except Exception as e:
        print(f"Error getting servers: {e}")
        # Fallback to showing all servers if MikroTik connection fails
    if user.is_admin:
        servers = WireGuardServer.query.all()
    else:
        servers = WireGuardServer.query.filter_by(user_id=user.id).all()
    
    return jsonify([{
        'id': server.id,
        'name': server.name,
        'interface_name': server.interface_name,
        'listen_port': server.listen_port,
        'address': server.address,
        'is_active': server.is_active,
        'created_at': server.created_at.isoformat(),
        'peer_count': WireGuardPeer.query.filter_by(server_id=server.id, is_active=True).count()
    } for server in servers])

@app.route('/api/servers', methods=['POST'])
@jwt_required()
def create_server():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    data = request.get_json()
    
    # Generate WireGuard keys
    private_key, public_key = generate_wireguard_keys()
    
    # Find available port
    used_ports = [server.listen_port for server in WireGuardServer.query.all()]
    listen_port = 51820
    while listen_port in used_ports:
        listen_port += 1
    
    # Create server
    server = WireGuardServer(
        name=data['name'],
        interface_name=f"wg-{data['name'].lower().replace(' ', '-')}",
        private_key=private_key,
        public_key=public_key,
        listen_port=listen_port,
        address=data['address'],
        user_id=user.id
    )
    
    print(f"Creating server: {data['name']}, Interface: {server.interface_name}, Address: {data['address']}, Port: {listen_port}")
    db.session.add(server)
    db.session.commit()
    print(f"Server created with ID: {server.id}")
    
    # Create interface on MikroTik (legacy API)
    try:
        mikrotik_legacy = MikroTikLegacyAPI(
            host=config['mikrotik']['host'],
            username=config['mikrotik']['username'],
            password=config['mikrotik']['password'],
            port=8728
        )
        mikrotik_legacy.create_wireguard_interface(server.interface_name, private_key, str(listen_port))
        mikrotik_legacy.add_ip_address(data['address'], server.interface_name)
        mikrotik_legacy.add_firewall_rule(listen_port)
    except Exception as e:
        print(f"Failed to create interface, add IP or firewall on MikroTik (legacy API): {e}")
    
    return jsonify({
        'id': server.id,
        'name': server.name,
        'interface_name': server.interface_name,
        'listen_port': server.listen_port,
        'address': server.address,
        'public_key': public_key
    })

@app.route('/api/servers/<int:server_id>', methods=['GET'])
@jwt_required()
def get_server(server_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    server = WireGuardServer.query.get(server_id)
    if not server:
        return jsonify({'error': 'Server not found'}), 404
    # Dozvoli pristup samo adminu ili vlasniku servera
    if not user.is_admin and server.user_id != user.id:
        return jsonify({'error': 'Forbidden'}), 403
    return jsonify({
        'id': server.id,
        'name': server.name,
        'interface_name': server.interface_name,
        'listen_port': server.listen_port,
        'address': server.address,
        'is_active': server.is_active,
        'created_at': server.created_at.isoformat(),
        'public_key': server.public_key
    })

@app.route('/api/servers/<int:server_id>/peers', methods=['GET'])
@jwt_required()
def get_peers(server_id):
    server = WireGuardServer.query.get(server_id)
    if not server:
        return jsonify({'error': 'Server not found'}), 404
    
    peers = WireGuardPeer.query.filter_by(server_id=server_id, is_active=True).all()
    print(f"Getting peers for server {server_id}: found {len(peers)} peers")
    for peer in peers:
        print(f"  Peer: {peer.name}, ID: {peer.id}, Allowed IPs: {peer.allowed_ips}")
    
    return jsonify([{
        'id': peer.id,
        'name': peer.name,
        'public_key': peer.public_key,
        'allowed_ips': peer.allowed_ips,
        'allowed_ips_to_peer': peer.allowed_ips_to_peer,
        'allowed_ips_from_peer': peer.allowed_ips_from_peer,
        'created_at': peer.created_at.isoformat(),
        'last_handshake': peer.last_handshake.isoformat() if peer.last_handshake else None,
        'transfer_rx': peer.transfer_rx,
        'transfer_tx': peer.transfer_tx,
        'config': f"""[Interface]\nPrivateKey = {peer.private_key}\nAddress = {peer.allowed_ips}\nListenPort = {server.listen_port}\n\n[Peer]\nPublicKey = {server.public_key}\nAllowedIPs = {peer.allowed_ips_from_peer if peer.allowed_ips_from_peer else '0.0.0.0/0'}\nEndpoint = {config['mikrotik']['host']}:{server.listen_port}\nPersistentKeepalive = 25""",
        'qr_code': generate_qr_code(f"""[Interface]\nPrivateKey = {peer.private_key}\nAddress = {peer.allowed_ips}\nListenPort = {server.listen_port}\n\n[Peer]\nPublicKey = {server.public_key}\nAllowedIPs = {peer.allowed_ips_from_peer if peer.allowed_ips_from_peer else '0.0.0.0/0'}\nEndpoint = {config['mikrotik']['host']}:{server.listen_port}\nPersistentKeepalive = 25""")
    } for peer in peers])

@app.route('/api/servers/<int:server_id>/peers', methods=['POST'])
@jwt_required()
def create_peer(server_id):
    data = request.get_json()
    
    # Generate peer keys
    private_key, public_key = generate_wireguard_keys()
    
    # Generate peer IP from server subnet
    server = WireGuardServer.query.get(server_id)
    existing_peers = WireGuardPeer.query.filter_by(server_id=server_id, is_active=True).all()
    
    # Parse server subnet
    net = ipaddress.ip_network(server.address, strict=False)
    server_ip = ipaddress.ip_address(server.address.split('/')[0])
    
    # Get used IPs from existing peers (peer IP addresses, not allowed IPs)
    used_ips = []
    for peer in existing_peers:
        try:
            peer_ip = ipaddress.ip_address(peer.allowed_ips.split('/')[0])
            used_ips.append(peer_ip)
        except:
            continue
    
    # Find next free IP for peer
    peer_ip = None
    for ip in net.hosts():
        if ip != server_ip and ip not in used_ips:
            peer_ip = ip
            break
    if not peer_ip:
        return jsonify({'error': 'Nema slobodnih IP adresa u subnetu servera'}), 400
    allowed_ips_peer = f"{peer_ip}/32"
    
    # Allowed IPs iz requesta - sada imamo dva polja
    allowed_ips_to_peer = data.get('allowed_ips_to_peer', '').strip()  # Adrese od MikroTik-a ka peer-u
    allowed_ips_from_peer = data.get('allowed_ips_from_peer', '').strip()  # Adrese od peer-a ka MikroTik-u
    
    # Parse allowed IPs
    allowed_to_peer_list = [a.strip() for a in allowed_ips_to_peer.split(',') if a.strip()] if allowed_ips_to_peer else []
    allowed_from_peer_list = [a.strip() for a in allowed_ips_from_peer.split(',') if a.strip()] if allowed_ips_from_peer else []
    
    # Provera preklapanja allowed IP adresa sa postojećim peer-ovima
    for a in allowed_to_peer_list + allowed_from_peer_list:
        try:
            new_net = ipaddress.ip_network(a, strict=False)
        except Exception:
            return jsonify({'error': f'Neispravna allowed adresa: {a}'}), 400
        
        # Proveri preklapanje sa postojećim peer-ovima
        for peer in existing_peers:
            # Peer-ovi imaju svoje IP adrese u allowed_ips polju
            try:
                peer_ip = ipaddress.ip_address(peer.allowed_ips.split('/')[0])
                if new_net.overlaps(ipaddress.ip_network(f"{peer_ip}/32", strict=False)):
                    return jsonify({'error': f'Allowed adresa {a} se preklapa sa peer IP adresom {peer_ip}'}), 400
            except:
                continue
    
    # Upis peer-a
    peer = WireGuardPeer(
        name=data['name'],
        public_key=public_key,
        private_key=private_key,
        allowed_ips=allowed_ips_peer,
        allowed_ips_to_peer=allowed_ips_to_peer if allowed_ips_to_peer else None,
        allowed_ips_from_peer=allowed_ips_from_peer if allowed_ips_from_peer else None,
        server_id=server_id
    )
    
    print(f"Creating peer: {data['name']}, IP: {allowed_ips_peer}, Server ID: {server_id}")
    db.session.add(peer)
    db.session.commit()
    print(f"Peer created with ID: {peer.id}")
    
    # Create peer on MikroTik (legacy API)
    try:
        print(f"Attempting to create peer on MikroTik: interface={server.interface_name}, public_key={public_key[:20]}...")
        mikrotik_legacy = MikroTikLegacyAPI(
            host=config['mikrotik']['host'],
            username=config['mikrotik']['username'],
            password=config['mikrotik']['password'],
            port=8728
        )
        # Koristi allowed_ips_to_peer za MikroTik peer (adrese od MikroTik-a ka peer-u)
        # Peer IP adresa mora biti obavezno uključena
        allowed_ips_for_mikrotik = allowed_ips_to_peer if allowed_ips_to_peer else ''
        
        # Dodaj peer IP adresu ako nije već uključena
        if allowed_ips_for_mikrotik:
            if allowed_ips_peer not in allowed_ips_for_mikrotik:
                allowed_ips_for_mikrotik = f"{allowed_ips_peer},{allowed_ips_for_mikrotik}"
        else:
            allowed_ips_for_mikrotik = allowed_ips_peer
        
        print(f"Creating peer with allowed_ips_for_mikrotik: {allowed_ips_for_mikrotik}")
        
        result = mikrotik_legacy.create_wireguard_peer(server.interface_name, public_key, allowed_ips_for_mikrotik, data['name'], server.listen_port)
        print(f"MikroTik peer creation result: {result}")
        
        # Ne dodajemo automatski rute - to se sada radi kroz admin sekciju
    except Exception as e:
        print(f"Failed to create peer on MikroTik (legacy API): {e}")
        import traceback
        traceback.print_exc()
    
    # Generate configuration - koristi allowed_ips_from_peer za peer config
    config_str = f"""[Interface]\nPrivateKey = {private_key}\nAddress = {allowed_ips_peer}\nListenPort = {server.listen_port}\n\n[Peer]\nPublicKey = {server.public_key}\nAllowedIPs = {allowed_ips_from_peer if allowed_ips_from_peer else '0.0.0.0/0'}\nEndpoint = {config['mikrotik']['host']}:{server.listen_port}\nPersistentKeepalive = 25"""
    qr_code = generate_qr_code(config_str)
    
    return jsonify({
        'id': peer.id,
        'name': peer.name,
        'public_key': public_key,
        'allowed_ips': allowed_ips_peer,
        'allowed_ips_to_peer': allowed_ips_to_peer,
        'allowed_ips_from_peer': allowed_ips_from_peer,
        'config': config_str,
        'qr_code': qr_code
    })

@app.route('/api/servers/<int:server_id>/peers/<int:peer_id>', methods=['DELETE'])
@jwt_required()
def delete_peer(server_id, peer_id):
    peer = WireGuardPeer.query.get(peer_id)
    if peer and peer.server_id == server_id:
        peer.is_active = False
        db.session.commit()
        
        # Delete from MikroTik (legacy API)
        try:
            mikrotik_legacy = MikroTikLegacyAPI(
                host=config['mikrotik']['host'],
                username=config['mikrotik']['username'],
                password=config['mikrotik']['password'],
                port=8728
            )
            # Treba da nađemo peer na MikroTik-u po public key-u
            mikrotik_legacy.delete_peer(peer.public_key)
        except Exception as e:
            print(f"Failed to delete peer from MikroTik: {e}")
        
        return jsonify({'message': 'Peer deleted successfully'})
    
    return jsonify({'error': 'Peer not found'}), 404

@app.route('/api/servers/<int:server_id>/peers/<int:peer_id>', methods=['PUT'])
@jwt_required()
def update_peer(server_id, peer_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    
    peer = WireGuardPeer.query.get(peer_id)
    if not peer or peer.server_id != server_id:
        return jsonify({'error': 'Peer not found'}), 404
    
    # Check permissions
    server = WireGuardServer.query.get(server_id)
    if not user.is_admin and server.user_id != user.id:
        return jsonify({'error': 'Forbidden'}), 403
    
    data = request.get_json()
    
    # Update peer name
    if 'name' in data:
        peer.name = data['name']
    
    # Update allowed IPs if provided
    if 'allowed_ips_to_peer' in data:
        allowed_ips_to_peer = data['allowed_ips_to_peer'].strip()
        allowed_to_peer_list = [a.strip() for a in allowed_ips_to_peer.split(',') if a.strip()] if allowed_ips_to_peer else []
        
        # Check for overlaps with other peers
        existing_peers = WireGuardPeer.query.filter_by(server_id=server_id, is_active=True).filter(WireGuardPeer.id != peer_id).all()
        for a in allowed_to_peer_list:
            try:
                new_net = ipaddress.ip_network(a, strict=False)
            except Exception:
                return jsonify({'error': f'Neispravna allowed adresa: {a}'}), 400
            
            # Proveri preklapanje sa postojećim peer-ovima
            for other_peer in existing_peers:
                try:
                    other_peer_ip = ipaddress.ip_address(other_peer.allowed_ips.split('/')[0])
                    if new_net.overlaps(ipaddress.ip_network(f"{other_peer_ip}/32", strict=False)):
                        return jsonify({'error': f'Allowed adresa {a} se preklapa sa peer IP adresom {other_peer_ip}'}), 400
                except:
                    continue
        
        # Update peer's allowed IPs to peer
        peer.allowed_ips_to_peer = allowed_ips_to_peer if allowed_ips_to_peer else None
    
    if 'allowed_ips_from_peer' in data:
        allowed_ips_from_peer = data['allowed_ips_from_peer'].strip()
        peer.allowed_ips_from_peer = allowed_ips_from_peer if allowed_ips_from_peer else None
    
    db.session.commit()
    
    # Update on MikroTik (legacy API)
    try:
        mikrotik_legacy = MikroTikLegacyAPI(
            host=config['mikrotik']['host'],
            username=config['mikrotik']['username'],
            password=config['mikrotik']['password'],
            port=8728
        )
        
        # Ako je promenjen name, ažuriraj comment na MikroTik-u
        if 'name' in data:
            mikrotik_legacy.update_peer_comment(peer.public_key, peer.name)
            print(f"Updated peer name on MikroTik: {peer.name}")
        
        # Ako je promenjen allowed_ips_to_peer, trebalo bi da se ažurira na MikroTik-u
        if 'allowed_ips_to_peer' in data:
            # Peer IP adresa mora biti obavezno uključena
            allowed_ips_for_mikrotik = peer.allowed_ips_to_peer if peer.allowed_ips_to_peer else ''
            
            # Dodaj peer IP adresu ako nije već uključena
            if allowed_ips_for_mikrotik:
                if peer.allowed_ips not in allowed_ips_for_mikrotik:
                    allowed_ips_for_mikrotik = f"{peer.allowed_ips},{allowed_ips_for_mikrotik}"
            else:
                allowed_ips_for_mikrotik = peer.allowed_ips
            
            print(f"Updated peer allowed_ips_for_mikrotik: {allowed_ips_for_mikrotik}")
    except Exception as e:
        print(f"Failed to update peer on MikroTik: {e}")
    
    return jsonify({
        'id': peer.id,
        'name': peer.name,
        'allowed_ips': peer.allowed_ips,
        'allowed_ips_to_peer': peer.allowed_ips_to_peer,
        'allowed_ips_from_peer': peer.allowed_ips_from_peer,
        'message': 'Peer updated successfully'
    })

@app.route('/api/servers/<int:server_id>', methods=['PUT'])
@jwt_required()
def update_server(server_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    
    server = WireGuardServer.query.get(server_id)
    if not server:
        return jsonify({'error': 'Server not found'}), 404
    
    # Check permissions
    if not user.is_admin and server.user_id != user.id:
        return jsonify({'error': 'Forbidden'}), 403
    
    data = request.get_json()
    
    # Update server name
    if 'name' in data:
        server.name = data['name']
        # Update interface name to match
        server.interface_name = f"wg-{data['name'].lower().replace(' ', '-')}"
    
    # Update server address
    if 'address' in data:
        server.address = data['address']
    
    db.session.commit()
    
    # Update on MikroTik (legacy API)
    try:
        mikrotik_legacy = MikroTikLegacyAPI(
            host=config['mikrotik']['host'],
            username=config['mikrotik']['username'],
            password=config['mikrotik']['password'],
            port=8728
        )
        # Update interface name and address on MikroTik
        # This would require MikroTik API support for updating interfaces
        print(f"Server {server.name} updated - name: {server.name}, address: {server.address}")
    except Exception as e:
        print(f"Failed to update server on MikroTik: {e}")
    
    return jsonify({
        'id': server.id,
        'name': server.name,
        'interface_name': server.interface_name,
        'address': server.address,
        'message': 'Server updated successfully'
    })

@app.route('/api/servers/<int:server_id>/soft-delete', methods=['POST'])
@jwt_required()
def soft_delete_server(server_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    
    server = WireGuardServer.query.get(server_id)
    if not server:
        return jsonify({'error': 'Server not found'}), 404
    
    # Check permissions
    if not user.is_admin and server.user_id != user.id:
        return jsonify({'error': 'Forbidden'}), 403
    
    # Soft delete server
    server.is_active = False
    
    # Soft delete all peers
    peers = WireGuardPeer.query.filter_by(server_id=server_id, is_active=True).all()
    for peer in peers:
        peer.is_active = False
    
    db.session.commit()
    
    # Disable interface and delete peers on MikroTik (legacy API)
    try:
        mikrotik_legacy = MikroTikLegacyAPI(
            host=config['mikrotik']['host'],
            username=config['mikrotik']['username'],
            password=config['mikrotik']['password'],
            port=8728
        )
        
        # Get all peers from MikroTik for this interface
        mikrotik_peers = mikrotik_legacy.get_wireguard_peers(server.interface_name)
        
        # Delete all peers from MikroTik
        for peer in peers:
            # Find MikroTik peer by public key
            mikrotik_peer = None
            for mp in mikrotik_peers:
                if mp.get('public-key') == peer.public_key:
                    mikrotik_peer = mp
                    break
            
            # Delete peer from MikroTik if found
            if mikrotik_peer:
                try:
                    mikrotik_legacy.delete_peer(mikrotik_peer['id'])
                    print(f"Deleted peer {peer.name} (MikroTik ID: {mikrotik_peer['id']}) from MikroTik")
                except Exception as e:
                    print(f"Failed to delete peer {peer.name} from MikroTik: {e}")
            else:
                print(f"Peer {peer.name} not found on MikroTik")
        
        # Disable interface on MikroTik
        mikrotik_legacy.disable_interface(server.interface_name)
    except Exception as e:
        print(f"Failed to disable server on MikroTik: {e}")
    
    return jsonify({'message': 'Server and peers disabled successfully'})

@app.route('/api/servers/<int:server_id>/restore', methods=['POST'])
@jwt_required()
def restore_server(server_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    
    server = WireGuardServer.query.get(server_id)
    if not server:
        return jsonify({'error': 'Server not found'}), 404
    
    # Check permissions
    if not user.is_admin and server.user_id != user.id:
        return jsonify({'error': 'Forbidden'}), 403
    
    # Restore server
    server.is_active = True
    
    # Restore all peers
    peers = WireGuardPeer.query.filter_by(server_id=server_id, is_active=False).all()
    for peer in peers:
        peer.is_active = True
    
    db.session.commit()
    
    # Enable interface and recreate peers on MikroTik (legacy API)
    try:
        mikrotik_legacy = MikroTikLegacyAPI(
            host=config['mikrotik']['host'],
            username=config['mikrotik']['username'],
            password=config['mikrotik']['password'],
            port=8728
        )
        
        # Enable interface on MikroTik
        mikrotik_legacy.enable_interface(server.interface_name)
        
        # Recreate all peers on MikroTik
        for peer in peers:
            try:
                # Parse allowed IPs for routes
                allowed_ips = peer.allowed_ips.strip()
                allowed_list = [a.strip() for a in allowed_ips.split(',') if a.strip()] if allowed_ips else []
                
                # Create peer on MikroTik
                mikrotik_legacy.create_wireguard_peer(server.interface_name, peer.public_key, peer.allowed_ips, peer.name)
                print(f"Recreated peer {peer.name} on MikroTik")
                
                # Add static routes for allowed IPs
                for allowed_ip in allowed_list:
                    try:
                        mikrotik_legacy.add_static_route(allowed_ip, server.interface_name)
                        print(f"Added route for {allowed_ip}")
                    except Exception as e:
                        print(f"Failed to add route for {allowed_ip}: {e}")
                        
            except Exception as e:
                print(f"Failed to recreate peer {peer.name} on MikroTik: {e}")
                
    except Exception as e:
        print(f"Failed to enable server on MikroTik: {e}")
    
    return jsonify({'message': 'Server and peers restored successfully'})

@app.route('/api/servers/<int:server_id>/permanent-delete', methods=['DELETE'])
@jwt_required()
def permanent_delete_server(server_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    
    server = WireGuardServer.query.get(server_id)
    if not server:
        return jsonify({'error': 'Server not found'}), 404
    
    # Check permissions
    if not user.is_admin and server.user_id != user.id:
        return jsonify({'error': 'Forbidden'}), 403
    
    # Delete all peers first
    peers = WireGuardPeer.query.filter_by(server_id=server_id).all()
    
    # Get MikroTik peers to find their IDs
    try:
        mikrotik_legacy = MikroTikLegacyAPI(
            host=config['mikrotik']['host'],
            username=config['mikrotik']['username'],
            password=config['mikrotik']['password'],
            port=8728
        )
        
        # Get all peers from MikroTik for this interface
        mikrotik_peers = mikrotik_legacy.get_wireguard_peers(server.interface_name)
        
        for peer in peers:
            # Find MikroTik peer by public key
            mikrotik_peer = None
            for mp in mikrotik_peers:
                if mp.get('public-key') == peer.public_key:
                    mikrotik_peer = mp
                    break
            
            # Delete peer from MikroTik if found
            if mikrotik_peer:
                try:
                    mikrotik_legacy.delete_peer(mikrotik_peer['id'])
                    print(f"Deleted peer {peer.name} (MikroTik ID: {mikrotik_peer['id']}) from MikroTik")
                except Exception as e:
                    print(f"Failed to delete peer {peer.name} from MikroTik: {e}")
            else:
                print(f"Peer {peer.name} not found on MikroTik")
            
            db.session.delete(peer)
    except Exception as e:
        print(f"Failed to connect to MikroTik for peer deletion: {e}")
        # Still delete from database even if MikroTik deletion fails
        for peer in peers:
            db.session.delete(peer)
    
    # Delete static routes
    routes = StaticRoute.query.filter_by(server_id=server_id).all()
    for route in routes:
        db.session.delete(route)
    
    # Delete server
    db.session.delete(server)
    db.session.commit()
    
    # Delete from MikroTik (legacy API)
    try:
        mikrotik_legacy = MikroTikLegacyAPI(
            host=config['mikrotik']['host'],
            username=config['mikrotik']['username'],
            password=config['mikrotik']['password'],
            port=8728
        )
        # Delete interface and all peers from MikroTik
        mikrotik_legacy.delete_interface(server.interface_name)
    except Exception as e:
        print(f"Failed to delete server from MikroTik: {e}")
    
    return jsonify({'message': 'Server permanently deleted'})

@app.route('/api/servers/<int:server_id>/stats', methods=['GET'])
@jwt_required()
def get_server_stats(server_id):
    server = WireGuardServer.query.get(server_id)
    if not server:
        return jsonify({'error': 'Server not found'}), 404
    
    peers = WireGuardPeer.query.filter_by(server_id=server_id, is_active=True).all()
    
    total_rx = sum(peer.transfer_rx for peer in peers)
    total_tx = sum(peer.transfer_tx for peer in peers)
    
    return jsonify({
        'server_name': server.name,
        'peer_count': len(peers),
        'total_rx': total_rx,
        'total_tx': total_tx,
        'peers': [{
            'name': peer.name,
            'transfer_rx': peer.transfer_rx,
            'transfer_tx': peer.transfer_tx,
            'last_handshake': peer.last_handshake.isoformat() if peer.last_handshake else None
        } for peer in peers]
    })

@app.route('/api/sync-mikrotik', methods=['POST'])
@jwt_required()
def sync_mikrotik():
    """Sync existing servers and peers from MikroTik"""
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    
    if not user.is_admin:
        return jsonify({'error': 'Only admins can sync from MikroTik'}), 403
    
    try:
        mikrotik_legacy = MikroTikLegacyAPI(
            host=config['mikrotik']['host'],
            username=config['mikrotik']['username'],
            password=config['mikrotik']['password'],
            port=8728
        )
        
        # Get existing interfaces from MikroTik
        interfaces = mikrotik_legacy.get_wireguard_interfaces()
        synced_count = 0
        updated_count = 0
        
        for interface in interfaces:
            # Check if server already exists
            existing_server = WireGuardServer.query.filter_by(
                interface_name=interface['name']
            ).first()
            
            if existing_server:
                # Update existing server with correct address
                if existing_server.address != interface.get('address', '10.0.0.1/24'):
                    existing_server.address = interface.get('address', '10.0.0.1/24')
                    updated_count += 1
                    print(f"Updated server {existing_server.name} address to {interface.get('address')}")
            else:
                # Create new server
                server = WireGuardServer(
                    name=f"Imported {interface['name']}",
                    interface_name=interface['name'],
                    private_key=interface.get('private-key', ''),
                    public_key=interface.get('public-key', ''),
                    listen_port=int(interface.get('listen-port', 51820)),
                    address=interface.get('address', '10.0.0.1/24'),  # Sada će biti ispravna adresa
                    user_id=user.id,
                    is_active=interface.get('disabled', 'true') == 'false'
                )
                db.session.add(server)
                db.session.flush()  # Get server ID
                
                # Get peers for this interface
                peers = mikrotik_legacy.get_wireguard_peers(interface['name'])
                for peer in peers:
                    peer_obj = WireGuardPeer(
                        name=peer.get('comment', f"Peer {peer['id']}"),
                        public_key=peer.get('public-key', ''),
                        private_key='',  # We don't have private keys for existing peers
                        allowed_ips=peer.get('allowed-address', ''),
                        server_id=server.id,
                        is_active=True
                    )
                    db.session.add(peer_obj)
                
                synced_count += 1
        
        db.session.commit()
        
        return jsonify({
            'message': f'Successfully synced {synced_count} new servers and updated {updated_count} existing servers from MikroTik',
            'synced_count': synced_count,
            'updated_count': updated_count
        })
        
    except Exception as e:
        return jsonify({'error': f'Failed to sync from MikroTik: {str(e)}'}), 500

@app.route('/api/servers/<int:server_id>/connection-status', methods=['GET'])
@jwt_required()
def get_connection_status(server_id):
    """Get connection status and statistics for server and peers"""
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    
    server = WireGuardServer.query.get(server_id)
    if not server:
        return jsonify({'error': 'Server not found'}), 404
    
    if not user.is_admin and server.user_id != user.id:
        return jsonify({'error': 'Forbidden'}), 403
    
    try:
        mikrotik_legacy = MikroTikLegacyAPI(
            host=config['mikrotik']['host'],
            username=config['mikrotik']['username'],
            password=config['mikrotik']['password'],
            port=8728
        )
        
        # Get interface status
        interface_status = mikrotik_legacy.get_interface_status(server.interface_name)
        
        # Get peer statistics
        peers = WireGuardPeer.query.filter_by(server_id=server_id, is_active=True).all()
        peer_stats = []
        
        for peer in peers:
            peer_status = mikrotik_legacy.get_peer_status(server.interface_name, peer.public_key)
            print(f"Debug: Peer {peer.name} status: {peer_status}")  # Debug log
            if peer_status:
                print(f"  - Last handshake: {peer_status.get('last-handshake', 'N/A')}")
                print(f"  - RX bytes: {peer_status.get('rx-bytes', 'N/A')}")
                print(f"  - TX bytes: {peer_status.get('tx-bytes', 'N/A')}")
                print(f"  - All keys: {list(peer_status.keys())}")
            else:
                print(f"  - No status data available")
            
            if peer_status:
                # Update peer statistics in database
                last_handshake_str = peer_status.get('last-handshake', '')
                print(f"  - Last handshake raw: '{last_handshake_str}'")
                
                # Improved connection detection logic
                is_connected = False
                if last_handshake_str and last_handshake_str.lower() != 'never':
                    try:
                        # MikroTik vraća relativno vreme ("7s", "35s", "4w6d3h22m18s")
                        # Konvertuj u apsolutno vreme
                        from datetime import datetime, timedelta
                        import re
                        
                        # Parse relative time
                        total_seconds = 0
                        time_parts = re.findall(r'(\d+)([wdhms])', last_handshake_str)
                        
                        for value, unit in time_parts:
                            value = int(value)
                            if unit == 'w':
                                total_seconds += value * 7 * 24 * 3600
                            elif unit == 'd':
                                total_seconds += value * 24 * 3600
                            elif unit == 'h':
                                total_seconds += value * 3600
                            elif unit == 'm':
                                total_seconds += value * 60
                            elif unit == 's':
                                total_seconds += value
                        
                        # Izračunaj apsolutno vreme
                        peer.last_handshake = datetime.now() - timedelta(seconds=total_seconds)
                        print(f"  - Parsed handshake: {peer.last_handshake} (from {last_handshake_str})")
                        
                        # Consider connected if handshake was within last 2 minutes
                        # MikroTik may not update immediately, so we use a more generous threshold
                        time_since_handshake = datetime.now() - peer.last_handshake
                        is_connected = time_since_handshake.total_seconds() <= 120  # 2 minutes
                        print(f"  - Time since handshake: {time_since_handshake.total_seconds():.1f}s, Connected: {is_connected}")
                        
                    except Exception as e:
                        print(f"  - Handshake parse error: {e}")
                        peer.last_handshake = None
                        is_connected = False
                else:
                    peer.last_handshake = None
                    is_connected = False
                
                try:
                    # MikroTik vraća transfer podatke u 'rx' i 'tx' poljima
                    rx_bytes = peer_status.get('rx', 0)
                    tx_bytes = peer_status.get('tx', 0)
                    
                    # Konvertuj u brojeve
                    if isinstance(rx_bytes, str):
                        rx_bytes = int(rx_bytes) if rx_bytes.isdigit() else 0
                    if isinstance(tx_bytes, str):
                        tx_bytes = int(tx_bytes) if tx_bytes.isdigit() else 0
                    
                    peer.transfer_rx = rx_bytes
                    peer.transfer_tx = tx_bytes
                    
                    print(f"  - Transfer RX: {format_bytes(rx_bytes)}, TX: {format_bytes(tx_bytes)}")
                except (ValueError, TypeError) as e:
                    print(f"  - Transfer error: {e}")
                    peer.transfer_rx = 0
                    peer.transfer_tx = 0
                
                peer_stats.append({
                    'id': peer.id,
                    'name': peer.name,
                    'public_key': peer.public_key,
                    'last_handshake': peer.last_handshake.isoformat() if peer.last_handshake else None,
                    'transfer_rx': peer.transfer_rx,
                    'transfer_tx': peer.transfer_tx,
                    'is_connected': is_connected
                })
            else:
                # Add peer without status (not connected)
                peer_stats.append({
                    'id': peer.id,
                    'name': peer.name,
                    'public_key': peer.public_key,
                    'last_handshake': None,
                    'transfer_rx': 0,
                    'transfer_tx': 0,
                    'is_connected': False
                })
        
        db.session.commit()
        
        return jsonify({
            'server_id': server.id,
            'interface_name': server.interface_name,
            'interface_status': interface_status,
            'peers': peer_stats
        })
        
    except Exception as e:
        return jsonify({'error': f'Failed to get connection status: {str(e)}'}), 500

@app.route('/api/servers/<int:server_id>/static-routes', methods=['GET'])
@jwt_required()
def get_static_routes(server_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    
    # Check permissions
    server = WireGuardServer.query.get(server_id)
    if not server:
        return jsonify({'error': 'Server not found'}), 404
    
    if not user.is_admin and server.user_id != user.id:
        return jsonify({'error': 'Forbidden'}), 403
    
    routes = StaticRoute.query.filter_by(server_id=server_id).all()
    return jsonify([{
        'id': route.id,
        'destination': route.destination,
        'gateway': route.gateway,
        'created_at': route.created_at.isoformat()
    } for route in routes])

@app.route('/api/servers/<int:server_id>/static-routes', methods=['POST'])
@jwt_required()
def create_static_route(server_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    
    # Check permissions - only admins can create static routes
    if not user.is_admin:
        return jsonify({'error': 'Only administrators can create static routes'}), 403
    
    server = WireGuardServer.query.get(server_id)
    if not server:
        return jsonify({'error': 'Server not found'}), 404
    
    data = request.get_json()
    destination = data.get('destination', '').strip()
    gateway = data.get('gateway', '').strip()
    
    if not destination or not gateway:
        return jsonify({'error': 'Destination and gateway are required'}), 400
    
    # Validate IP addresses
    try:
        ipaddress.ip_network(destination, strict=False)
        ipaddress.ip_address(gateway)
    except ValueError:
        return jsonify({'error': 'Invalid IP address format'}), 400
    
    # Create route in database
    route = StaticRoute(
        destination=destination,
        gateway=gateway,
        server_id=server_id
    )
    db.session.add(route)
    db.session.commit()
    
    # Add route to MikroTik
    try:
        mikrotik_legacy = MikroTikLegacyAPI(
            host=config['mikrotik']['host'],
            username=config['mikrotik']['username'],
            password=config['mikrotik']['password'],
            port=8728
        )
        result = mikrotik_legacy.add_static_route(destination, gateway)
        print(f"Static route creation result: {result}")
    except Exception as e:
        print(f"Failed to create static route on MikroTik: {e}")
        # Don't fail the request, just log the error
    
    return jsonify({
        'id': route.id,
        'destination': route.destination,
        'gateway': route.gateway,
        'created_at': route.created_at.isoformat()
    })

@app.route('/api/servers/<int:server_id>/update-peer-names', methods=['POST'])
@jwt_required()
def update_peer_names(server_id):
    """Update all peer names on MikroTik to match database names"""
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    
    # Check permissions
    server = WireGuardServer.query.get(server_id)
    if not user.is_admin and server.user_id != user.id:
        return jsonify({'error': 'Forbidden'}), 403
    
    try:
        mikrotik_legacy = MikroTikLegacyAPI(
            host=config['mikrotik']['host'],
            username=config['mikrotik']['username'],
            password=config['mikrotik']['password'],
            port=8728
        )
        
        # Get all active peers for this server
        peers = WireGuardPeer.query.filter_by(server_id=server_id, is_active=True).all()
        updated_count = 0
        
        for peer in peers:
            if mikrotik_legacy.update_peer_comment(peer.public_key, peer.name):
                updated_count += 1
                print(f"Updated peer {peer.name} on MikroTik")
        
        return jsonify({
            'message': f'Updated {updated_count} peer names on MikroTik',
            'updated_count': updated_count
        })
        
    except Exception as e:
        print(f"Failed to update peer names: {e}")
        return jsonify({'error': 'Failed to update peer names'}), 500

@app.route('/api/servers/<int:server_id>/static-routes/<int:route_id>', methods=['DELETE'])
@jwt_required()
def delete_static_route(server_id, route_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    
    # Check permissions - only admins can delete static routes
    if not user.is_admin:
        return jsonify({'error': 'Only administrators can delete static routes'}), 403
    
    route = StaticRoute.query.get(route_id)
    if not route or route.server_id != server_id:
        return jsonify({'error': 'Route not found'}), 404
    
    # Delete from MikroTik (you would need to implement this in MikroTikLegacyAPI)
    try:
        mikrotik_legacy = MikroTikLegacyAPI(
            host=config['mikrotik']['host'],
            username=config['mikrotik']['username'],
            password=config['mikrotik']['password'],
            port=8728
        )
        # Note: You would need to implement delete_static_route in MikroTikLegacyAPI
        # mikrotik_legacy.delete_static_route(route.destination, route.gateway)
    except Exception as e:
        print(f"Failed to delete static route from MikroTik: {e}")
    
    db.session.delete(route)
    db.session.commit()
    
    return jsonify({'message': 'Static route deleted successfully'})

# Import and register personalized client blueprint
from personalized_client_api import init_personalized_client_app
init_personalized_client_app(app)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
        # Create default admin user if not exists
        admin = User.query.filter_by(username='admin').first()
        if not admin:
            admin = User(
                username='admin',
                email='admin@example.com',
                password_hash=hash_password('admin123'),
                is_admin=True,
                is_verified=True
            )
            db.session.add(admin)
            db.session.commit()
            print("Admin user created: admin / admin123")
    
    # Railway deployment configuration
    port = int(os.environ.get('PORT', config['app']['port']))
    app.run(debug=False, host='0.0.0.0', port=port) 