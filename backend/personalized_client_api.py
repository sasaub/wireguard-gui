#!/usr/bin/env python3
"""
Backend API za personalizovani WireGuard klijent
"""

from flask import Blueprint, request, jsonify, send_file, current_app
import subprocess
import json
import os
import tempfile
import shutil
from datetime import datetime
import zipfile
from io import BytesIO

personalized_client = Blueprint('personalized_client', __name__)

# Konfiguracija za personalizovani klijent
CLIENT_TEMPLATE_DIR = 'personalized-client'
CLIENT_OUTPUT_DIR = 'generated-clients'

class PersonalizedClientGenerator:
    def __init__(self):
        self.template_dir = CLIENT_TEMPLATE_DIR
        self.output_dir = CLIENT_OUTPUT_DIR
        
        # Kreiraj output direktorijum ako ne postoji
        if not os.path.exists(self.output_dir):
            os.makedirs(self.output_dir)
    
    def generate_client(self, peer_data, server_data):
        """
        Generiše personalizovan klijent za dati peer
        """
        try:
            # Kreiraj jedinstveni ID za klijenta
            client_id = f"client_{peer_data['id']}_{int(datetime.now().timestamp())}"
            client_dir = os.path.join(self.output_dir, client_id)
            
            # Kopiraj template fajlove
            if os.path.exists(self.template_dir):
                shutil.copytree(self.template_dir, client_dir)
            else:
                raise Exception("Template direktorijum ne postoji")
            
            # Generiši konfiguraciju za klijenta
            client_config = self._generate_client_config(peer_data, server_data)
            
            # Sačuvaj konfiguraciju u klijent direktorijum
            config_file = os.path.join(client_dir, 'config.json')
            with open(config_file, 'w') as f:
                json.dump(client_config, f, indent=2)
            
            # Direktorijum je već kreiran kao client_dir, koristi ga direktno
            return {
                'client_id': client_id,
                'client_dir': client_dir,
                'config': client_config
            }
            
        except Exception as e:
            print(f"Greška pri generisanju klijenta: {e}")
            raise
    
    def _generate_client_config(self, peer_data, server_data):
        """
        Generiše konfiguraciju za klijenta
        """
        return {
            'peer_id': peer_data['id'],
            'peer_name': peer_data['name'],
            'server_name': server_data['name'],
            'server_address': server_data['address'],
            'server_port': server_data['listen_port'],
            'client_address': peer_data['allowed_ips'],
            'private_key': peer_data['private_key'],
            'public_key': peer_data['public_key'],
            'server_public_key': server_data['public_key'],
            'allowed_ips_from_peer': peer_data.get('allowed_ips_from_peer', '0.0.0.0/0'),
            'endpoint': f"{server_data['address']}:{server_data['listen_port']}",
            'generated_at': datetime.now().isoformat(),
            'company_name': 'MicroElectronic'
        }
    
    def _create_zip_archive(self, client_dir, client_id):
        """
        Kreira običan direktorijum sa klijent fajlovima (bez arhiviranja)
        """
        # Umesto arhiviranja, samo kopiraj fajlove u finalni direktorijum
        final_dir = os.path.join(self.output_dir, f"{client_id}")
        
        # Ako već postoji, obriši ga
        if os.path.exists(final_dir):
            shutil.rmtree(final_dir)
        
        # Kopiraj sve fajlove
        shutil.copytree(client_dir, final_dir)
        
        return final_dir

# Inicijalizacija generatora
client_generator = PersonalizedClientGenerator()

@personalized_client.route('/api/generate-personalized-client', methods=['POST'])
def generate_personalized_client():
    """
    Generiše personalizovan klijent za dati peer
    """
    try:
        data = request.get_json()
        peer_id = data.get('peer_id')
        
        if not peer_id:
            return jsonify({'error': 'peer_id je obavezan'}), 400

        # Import modela iz models.py
        from models import WireGuardPeer, WireGuardServer

        peer = WireGuardPeer.query.get(peer_id)
        if not peer:
            return jsonify({'error': 'Peer nije pronađen'}), 404
        
        server = WireGuardServer.query.get(peer.server_id)
        if not server:
            return jsonify({'error': 'Server nije pronađen'}), 404
        
        # Konvertuj u dictionary
        peer_data = {
            'id': peer.id,
            'name': peer.name,
            'public_key': peer.public_key,
            'private_key': peer.private_key,
            'allowed_ips': peer.allowed_ips,
            'allowed_ips_from_peer': peer.allowed_ips_from_peer,
            'server_id': peer.server_id
        }
        
        server_data = {
            'id': server.id,
            'name': server.name,
            'address': server.address,
            'listen_port': server.listen_port,
            'public_key': server.public_key
        }
        
        # Generiši klijent
        result = client_generator.generate_client(peer_data, server_data)
        
        return jsonify({
            'success': True,
            'client_id': result['client_id'],
            'download_url': f"/api/download-personalized-client/{result['client_id']}",
            'filename': f"app-{result['client_id']}.wg",
            'message': 'Personalizovani klijent je uspešno generisan'
        })
        
    except Exception as e:
        print(f"Greška pri generisanju klijenta: {e}")
        return jsonify({'error': str(e)}), 500

@personalized_client.route('/api/download-personalized-client/<client_id>', methods=['GET'])
def download_personalized_client(client_id):
    """
    Preuzima generisani personalizovani klijent
    """
    try:
        client_dir = os.path.join(CLIENT_OUTPUT_DIR, f"client_{client_id}")
        
        if not os.path.exists(client_dir):
            return jsonify({'error': 'Klijent nije pronađen'}), 404
        
        # Kreiraj ZIP u memoriji
        import zipfile
        from io import BytesIO
        
        memory_file = BytesIO()
        with zipfile.ZipFile(memory_file, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(client_dir):
                for file in files:
                    file_path = os.path.join(root, file)
                    arcname = os.path.relpath(file_path, client_dir)
                    zipf.write(file_path, arcname)
        
        memory_file.seek(0)
        
        response = send_file(
            memory_file,
            as_attachment=True,
            download_name=f"app-{client_id}.wg",
            mimetype='application/octet-stream'
        )
        response.headers['Content-Disposition'] = f'attachment; filename="app-{client_id}.wg"'
        response.headers['X-Content-Type-Options'] = 'nosniff'
        return response
        
    except Exception as e:
        print(f"Greška pri preuzimanju klijenta: {e}")
        return jsonify({'error': str(e)}), 500

@personalized_client.route('/api/wireguard/connect', methods=['POST'])
def connect_wireguard():
    """
    Povezuje WireGuard klijent
    """
    try:
        data = request.get_json()
        config = data.get('config')
        peer_name = data.get('peer_name', 'client')
        
        if not config:
            return jsonify({'error': 'Konfiguracija je obavezna'}), 400
        
        # Kreiraj privremeni konfiguracioni fajl
        config_content = f"""[Interface]
PrivateKey = {config['private_key']}
Address = {config['client_address']}
ListenPort = 0

[Peer]
PublicKey = {config['server_public_key']}
Endpoint = {config['endpoint']}
AllowedIPs = {config['allowed_ips_from_peer']}
PersistentKeepalive = 25
"""
        
        # Sačuvaj konfiguraciju
        config_file = f"/tmp/wg-{peer_name}.conf"
        with open(config_file, 'w') as f:
            f.write(config_content)
        
        # Pokreni WireGuard
        result = subprocess.run(
            ['wg-quick', 'up', f'wg-{peer_name}'],
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0:
            return jsonify({
                'success': True,
                'message': 'WireGuard uspešno povezan',
                'interface': f'wg-{peer_name}'
            })
        else:
            return jsonify({
                'error': f'Greška pri povezivanju: {result.stderr}'
            }), 400
            
    except Exception as e:
        print(f"Greška pri povezivanju: {e}")
        return jsonify({'error': str(e)}), 500

@personalized_client.route('/api/wireguard/disconnect', methods=['POST'])
def disconnect_wireguard():
    """
    Odvezuje WireGuard klijent
    """
    try:
        data = request.get_json()
        peer_name = data.get('peer_name', 'client')
        
        # Zaustavi WireGuard
        result = subprocess.run(
            ['wg-quick', 'down', f'wg-{peer_name}'],
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0:
            return jsonify({
                'success': True,
                'message': 'WireGuard uspešno odvezan'
            })
        else:
            return jsonify({
                'error': f'Greška pri odvezivanju: {result.stderr}'
            }), 400
            
    except Exception as e:
        print(f"Greška pri odvezivanju: {e}")
        return jsonify({'error': str(e)}), 500

@personalized_client.route('/api/wireguard/status', methods=['GET'])
def get_wireguard_status():
    """
    Proverava status WireGuard povezivanja
    """
    try:
        # Proveri da li postoji aktivan WireGuard interfejs
        result = subprocess.run(
            ['wg', 'show'],
            capture_output=True,
            text=True
        )
        
        is_connected = result.returncode == 0 and result.stdout.strip() != ''
        
        return jsonify({
            'is_connected': is_connected,
            'interfaces': result.stdout if is_connected else '',
            'connection_start_time': datetime.now().isoformat() if is_connected else None
        })
        
    except Exception as e:
        print(f"Greška pri proveri statusa: {e}")
        return jsonify({
            'is_connected': False,
            'error': str(e)
        })

@personalized_client.route('/api/client/config', methods=['GET'])
def get_client_config():
    """
    Vraća konfiguraciju za klijenta
    """
    try:
        # Ovo bi trebalo da proveri da li postoji konfiguracija za trenutnog korisnika
        # Za sada vraćamo test konfiguraciju
        config_file = '/tmp/client-config.json'
        
        if os.path.exists(config_file):
            with open(config_file, 'r') as f:
                config = json.load(f)
            return jsonify(config)
        else:
            return jsonify({'error': 'Konfiguracija nije pronađena'}), 404
            
    except Exception as e:
        print(f"Greška pri učitavanju konfiguracije: {e}")
        return jsonify({'error': str(e)}), 500

# Registruj blueprint u glavnoj aplikaciji
def init_personalized_client_app(app):
    app.register_blueprint(personalized_client) 