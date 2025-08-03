# Komunikacija GUI-a sa MikroTik CHR-om

## 🔍 Kako GUI komunicira sa CHR-om

GUI aplikacija komunicira sa MikroTik CHR-om preko **REST API-ja** koji je ugrađen u RouterOS. Evo kako to funkcioniše:

### 📡 API Komunikacija

```python
# Primer komunikacije iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
    
    def create_wireguard_interface(self, name, private_key, listen_port):
        data = {
            "name": name,
            "private-key": private_key,
            "listen-port": listen_port,
            "mtu": 1420
        }
        response = self.session.post(f"{self.base_url}/interface/wireguard", json=data)
        return response.json()
```

### 🔧 Potrebne informacije za CHR

Da bi GUI radio sa vašim CHR-om, trebate sledeće informacije:

1. **IP adresa CHR-a** - IP adresa vašeg CHR-a u Proxmox mreži
2. **Username** - Korisničko ime (obično "admin")
3. **Password** - Lozinka vašeg CHR-a
4. **Port** - Port za HTTPS (obično 443)

### 📋 Koraci za konfiguraciju CHR-a

#### 1. Osnovna konfiguracija CHR-a

```bash
# Pristupite CHR-u preko konzole u Proxmox-u
# Ili preko SSH ako je omogućen

# Postavljanje IP adrese
/ip address add address=192.168.1.1/24 interface=ether1

# Omogućavanje HTTPS servisa
/ip service enable www-ssl

# Kreiranje admin korisnika
/user add name=admin password=VAŠA_LOZINKA group=full

# Omogućavanje API pristupa
/ip service set www-ssl certificate=none
```

#### 2. Provera API pristupa

```bash
# Testirajte API pristup
curl -k -u admin:VAŠA_LOZINKA https://IP_CHR_A/rest/system/resource
```

#### 3. Omogućavanje WireGuard-a

```bash
# WireGuard je automatski omogućen u RouterOS 7.x
# Možete proveriti sa:
/interface wireguard print
```

### 🔐 Sigurnost

#### 1. Ograničavanje pristupa po IP

```bash
# Ograničite pristup samo sa Debian VM-a
/ip firewall filter add chain=input src-address=IP_DEBIAN_VM action=accept
/ip firewall filter add chain=input action=drop
```

#### 2. Kreiranje posebnog korisnika za API

```bash
# Kreiranje korisnika samo za API
/user add name=api-user password=API_LOZINKA group=read
/user group print
/user group set policy=read,api,!local,!telnet,!ssh,!ftp,!reboot,!policy,!test,!winbox,!password,!web,!sniff,!sensitive,!romon,!dude,!tikapp api
```

### 📝 Konfiguracija u GUI-u

U `backend/config.json`:

```json
{
  "mikrotik": {
    "host": "192.168.1.1",
    "username": "admin",
    "password": "VAŠA_LOZINKA",
    "port": 443
  }
}
```

### 🧪 Testiranje konekcije

Koristite skriptu za testiranje:

```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

### 🔧 Česti problemi

#### Problem: "Connection refused"
```bash
# Proverite da li je CHR pokrenut
ping IP_CHR_A

# Proverite da li je HTTPS omogućen
curl -k https://IP_CHR_A
```

#### Problem: "Invalid credentials"
```bash
# Proverite korisnika
/user print

# Proverite da li korisnik ima API pristup
/user group print
```

#### Problem: "WireGuard not supported"
```bash
# Proverite RouterOS verziju
/system resource print

# Proverite WireGuard interface
/interface wireguard print
```

### 📊 API Endpoints koje GUI koristi

1. **GET /rest/system/resource** - Informacije o sistemu
2. **POST /rest/interface/wireguard** - Kreiranje WireGuard interface-a
3. **GET /rest/interface/wireguard** - Lista WireGuard interface-a
4. **POST /rest/interface/wireguard/peers** - Kreiranje peer-a
5. **DELETE /rest/interface/wireguard/peers/{id}** - Brisanje peer-a

### 🚀 Automatsko testiranje

GUI automatski testira konekciju pri pokretanju:

```python
# U backend/app.py
try:
    mikrotik = MikroTikAPI(
        host=os.environ.get('MIKROTIK_HOST'),
        username=os.environ.get('MIKROTIK_USER'),
        password=os.environ.get('MIKROTIK_PASS')
    )
    mikrotik.create_wireguard_interface(server.interface_name, private_key, listen_port)
except Exception as e:
    print(f"Failed to create interface on MikroTik: {e}")
```

### 💡 Saveti

1. **Koristite HTTPS** - GUI komunicira preko HTTPS-a
2. **Self-signed sertifikati** - GUI automatski ignoriše self-signed sertifikate
3. **Firewall pravila** - Omogućite pristup sa Debian VM-a
4. **API korisnik** - Kreirajte posebnog korisnika za API pristup
5. **Backup** - Redovno backup-ujte CHR konfiguraciju

### 🔍 Debugging

Za debugging API komunikacije, dodajte u `backend/app.py`:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

Ovo će prikazati sve HTTP zahteve i odgovore u konzoli. 