# WireGuard GUI Manager

🚀 **Jednostavna web aplikacija za upravljanje WireGuard VPN serverima na MikroTik CHR-u**

Ova aplikacija omogućava korisnicima **bez predznanja** da jednostavno kreiraju i upravljaju WireGuard VPN serverima kroz moderni grafički interfejs. Posebno je dizajnirana za rad sa MikroTik CHR (Cloud Hosted Router) na Proxmox-u.

## ✨ Funkcionalnosti

- 🔐 **Jednostavan GUI** - Korisnici bez predznanja mogu lako kreirati VPN servere
- 📱 **QR kodovi** - Automatsko generisanje QR kodova za brzo povezivanje
- 👥 **Multi-tenant** - Svaki korisnik ima svoj server i peer-ove
- 📊 **Dashboard** - Pregled statističkih podataka i aktivnih konekcija
- 🔧 **Upravljanje peer-ovima** - Dodavanje, brisanje i konfiguracija peer-ova
- 📋 **Kopiranje konfiguracije** - Jednostavno kopiranje u clipboard
- 🎨 **Moderna UI** - Lepši i intuitivniji interfejs od WebFig-a

## 🏗️ Arhitektura

```
WGGUI/
├── backend/           # Python Flask API
│   ├── app.py        # Glavna aplikacija
│   ├── requirements.txt
│   └── config.example.json
├── frontend/          # React aplikacija
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   └── App.js
│   └── package.json
├── docs/             # Dokumentacija
│   ├── INSTALACIJA.md
│   └── FAQ.md
└── scripts/          # Setup skripte
    ├── setup.sh      # Linux/macOS
    └── setup.bat     # Windows
```

## 🚀 Brza Instalacija

### Automatska Instalacija

#### Linux/macOS:
```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

#### Windows:
```cmd
scripts\setup.bat
```

### Ručna Instalacija

#### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/macOS
# ili
venv\Scripts\activate     # Windows

pip install -r requirements.txt
cp config.example.json config.json
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
```

#### 3. Konfiguracija
Uredite `backend/config.json` sa vašim MikroTik podacima:
```json
{
  "mikrotik": {
    "host": "192.168.1.1",
    "username": "admin",
    "password": "your-password",
    "port": 443
  }
}
```

#### 4. Pokretanje
```bash
# Terminal 1 - Backend
cd backend
python app.py

# Terminal 2 - Frontend
cd frontend
npm start
```

## 📖 Korišćenje

### 1. Pristup Aplikaciji
- Otvorite browser i idite na `http://localhost:3000`
- Prijavite se sa default kredencijalima: **admin** / **admin123**

### 2. Kreiranje WireGuard Servera
1. Kliknite "Novi Server" na dashboard-u
2. Unesite naziv servera (npr. "Glavni VPN Server")
3. Unesite IP adresu (npr. "10.0.0.1/24")
4. Kliknite "Kreiraj Server"

### 3. Dodavanje Peer-ova
1. Idite na detalje servera
2. Kliknite "Dodaj Peer"
3. Unesite naziv peer-a (npr. "Mobilni telefon")
4. Kliknite "Dodaj Peer"
5. Skenirajte QR kod sa WireGuard aplikacijom

### 4. Upravljanje Peer-ovima
- **QR Kod:** Prikaži QR kod za skeniranje
- **Kopiraj:** Kopiraj konfiguraciju u clipboard
- **Obriši:** Ukloni peer sa servera

## 🛠️ Tehnologije

- **Backend**: Python Flask, MikroTik API, SQLite
- **Frontend**: React, Material-UI, Axios
- **Authentication**: JWT tokens
- **VPN**: WireGuard protokol
- **Platform**: MikroTik CHR na Proxmox

## 📚 Dokumentacija

- 📖 [Detaljna Instalacija](docs/INSTALACIJA.md)
- ❓ [FAQ](docs/FAQ.md)
- 🔧 [Troubleshooting](docs/FAQ.md#troubleshooting)

## 🔒 Sigurnost

- JWT tokeni za autentifikaciju
- HTTPS za komunikaciju sa MikroTik-om
- WireGuard protokol (veoma siguran)
- SQLite baza za čuvanje podataka

## 🤝 Doprinos

Doprinosi su dobrodošli! Molimo vas da:

1. Fork-ujete repository
2. Napravite feature branch
3. Implementirate promene
4. Pošaljete pull request

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH
ssh administrator@IP_PROXMOX_RACUNARA

# Kopiranje na Debian VM
scp -r /tmp/wireguard-gui/ root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

## 🌐 Opcija 2: Direktno sa Windows-a na Debian VM

### 1. Omogućite SSH pristup na Debian VM-u
```bash
# Na Debian VM-u (preko Proxmox konzole)
apt update
apt install -y openssh-server
systemctl enable ssh
systemctl start ssh

# Proverite da li SSH radi
systemctl status ssh
```

### 2. Kopiranje direktno sa Windows-a
```cmd
<code_block_to_apply_changes_from>
```

## 🌐 Opcija 3: Preko Proxmox Web Interface-a

### 1. Upload na Proxmox
1. Otvorite Proxmox web interface
2. Idite na vaš Debian 12 VM
3. Kliknite "Shell" (konzola)
4. Kliknite "Upload" dugme
5. Izaberite sve fajlove i upload-ujte

### 2. Raspakivanje na Debian-u
```bash
# Na Debian VM-u
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Ako ste upload-ovali ZIP
unzip /path/to/uploaded/file.zip

# ILI ako ste upload-ovali tar.gz
tar -xzf /path/to/uploaded/file.tar.gz
```

## 🌐 Opcija 4: Koristeći WinSCP (Najlakše za Windows)

### 1. Preuzmite WinSCP
- Idite na https://winscp.net/
- Preuzmite i instalirajte WinSCP

### 2. Povežite se sa Debian VM-om
```
Host name: IP_DEBIAN_VM
Port: 22
User name: root
Password: VAŠA_LOZINKA_DEBIAN
```

### 3. Kopiranje fajlova
- Povežite se
- Drag & drop fajlove sa Windows-a na Debian VM
- Kopirajte u `/opt/wireguard-gui/`

## 🔧 Provera konekcije

### 1. Proverite da li možete da se povežete
```cmd
# U Windows Command Prompt-u
ping IP_DEBIAN_VM
```

### 2. Testirajte SSH konekciju
```cmd
# U Windows Command Prompt-u
ssh root@IP_DEBIAN_VM
```

## 📋 Koraci za kopiranje

### Korak 1: Priprema na Windows-u
```cmd
# Otvorite Command Prompt
# Idite u direktorijum gde su fajlovi
cd C:\path\to\WGGUI

# Proverite da li su fajlovi tu
dir
```

### Korak 2: Kopiranje
```cmd
# Kopiranje na Debian VM
scp -r . root@IP_DEBIAN_VM:/opt/wireguard-gui/
```

### Korak 3: Provera na Debian-u
```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Proverite da li su fajlovi kopirani
ls -la /opt/wireguard-gui/
```

## 📄 Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🆘 Podrška

Za dodatnu podršku:
- 📖 Proverite [dokumentaciju](docs/INSTALACIJA.md)
- ❓ Pogledajte [FAQ](docs/FAQ.md)
- 🐛 Otvorite issue na GitHub-u

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje i malu produkciju. Za velike instalacije preporučujemo dodatne sigurnosne mere i optimizacije. 

## 🎯 Odgovor na vaše pitanje

Da, trebate instalirati GUI aplikaciju na **Debian 12 VM-u** koji imate u Proxmox-u. Evo šta treba da radite:

### 📋 Potrebne informacije:

1. **IP adresa vašeg CHR-a** u Proxmox mreži
2. **Username i password** za CHR (obično admin/lozinka)
3. **IP adresa vašeg Debian 12 VM-a**

### 📋 Koraci za instalaciju:

#### 1. Priprema Debian VM-a
```bash
<code_block_to_apply_changes_from>
```

#### 2. Kopiranje fajlova
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopirajte sve fajlove iz ovog projekta
# (backend/, frontend/, docs/, scripts/, README.md, LICENSE)
```

#### 3. Instalacija
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend
cd ../frontend
npm install
```

#### 4. Konfiguracija
Uredite `backend/config.json`:
```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_A",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  }
}
```

#### 5. Testiranje konekcije
```bash
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

#### 6. Pokretanje
```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 🔍 Kako GUI komunicira sa CHR-om:

GUI koristi **REST API** koji je ugrađen u MikroTik RouterOS. Komunikacija se odvija preko HTTPS-a:

```python
# Primer iz backend/app.py
class MikroTikAPI:
    def __init__(self, host, username, password, port=443):
        self.base_url = f"https://{host}:{port}/rest"
        self.session = requests.Session()
        self.session.verify = False  # Za self-signed sertifikate
        self.session.auth = (username, password)
```

### 📚 Pristup aplikaciji:

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

### 🔧 Automatska instalacija:

Koristite skriptu za automatsku instalaciju:
```bash
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

Sve je detaljno dokumentovano u fajlovima koje sam kreirao. Aplikacija će automatski komunicirati sa vašim CHR-om i kreirati WireGuard servere i peer-ove! 🚀 

## 🌐 Opcija 1: SCP preko mreže

### 1. Prvo proverite IP adresu Proxmox računara
```bash
# Na Proxmox računaru proverite IP adresu
ip addr show
# Ili
hostname -I
```

### 2. Proverite IP adresu Debian VM-a u Proxmox-u
```bash
# U Proxmox web interface-u:
# 1. Idite na vaš Debian 12 VM
# 2. Kliknite "Shell" (konzola)
# 3. Unesite:
ip addr show
# Ili
hostname -I
```

### 3. Kopiranje sa Windows-a na Proxmox računar
```cmd
# U Windows Command Prompt-u
# Idite u direktorijum gde su fajlovi (WGGUI folder)

# Kopiranje na Proxmox računar
scp -r . administrator@IP_PROXMOX_RACUNARA:/tmp/wireguard-gui/
```

### 4. Kopiranje sa Proxmox-a na Debian VM
```bash
# Pristupite Proxmox računaru preko SSH#   R a i l w a y   r e d e p l o y   t r i g g e r  
 