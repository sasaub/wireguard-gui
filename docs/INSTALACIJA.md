# WireGuard GUI Manager - Instalacija

## Preduvjeti

Pre nego što počnete sa instalacijom, potrebno je da imate:

- **Python 3.8+** - [Preuzmite ovde](https://www.python.org/downloads/)
- **Node.js 16+** - [Preuzmite ovde](https://nodejs.org/)
- **MikroTik CHR** sa RouterOS 7.x
- **Proxmox VE** (opciono, za virtuelizaciju)

## Brza Instalacija

### 1. Kloniranje Repozitorija

```bash
git clone <repository-url>
cd WGGUI
```

### 2. Automatska Instalacija

#### Linux/macOS:
```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

#### Windows:
```cmd
scripts\setup.bat
```

### 3. Ručna Instalacija

#### Backend Setup

```bash
cd backend

# Kreiranje virtualnog okruženja
python -m venv venv

# Aktivacija virtualnog okruženja
# Linux/macOS:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Instalacija zavisnosti
pip install -r requirements.txt

# Kopiranje konfiguracionog fajla
cp config.example.json config.json
```

#### Frontend Setup

```bash
cd frontend

# Instalacija zavisnosti
npm install
```

## Konfiguracija

### 1. MikroTik CHR Postavljanje

1. **Instalacija CHR-a na Proxmox:**
   - Preuzmite CHR image sa [MikroTik sajta](https://mikrotik.com/download)
   - Kreirajte novu VM u Proxmox-u
   - Dodelite minimum 1GB RAM i 1 CPU core
   - Instalirajte CHR image

2. **Osnovna konfiguracija CHR-a:**
   ```bash
   # Pristup CHR-u preko konzole
   /ip address add address=192.168.1.1/24 interface=ether1
   /ip service enable www-ssl
   /user add name=admin password=your-password group=full
   ```

3. **Omogućavanje API pristupa:**
   ```bash
   /ip service enable www-ssl
   /ip service set www-ssl certificate=none
   ```

### 2. Aplikacijska Konfiguracija

Uredite `backend/config.json`:

```json
{
  "mikrotik": {
    "host": "192.168.1.1",
    "username": "admin",
    "password": "your-password",
    "port": 443
  },
  "app": {
    "secret_key": "your-secret-key-change-this",
    "jwt_secret": "jwt-secret-key-change-this",
    "debug": true,
    "host": "0.0.0.0",
    "port": 5000
  },
  "database": {
    "uri": "sqlite:///wireguard.db"
  }
}
```

### 3. Environment Variables (opciono)

Možete postaviti environment varijable umesto config.json:

```bash
export MIKROTIK_HOST="192.168.1.1"
export MIKROTIK_USER="admin"
export MIKROTIK_PASS="your-password"
export SECRET_KEY="your-secret-key"
export JWT_SECRET_KEY="jwt-secret-key"
```

## Pokretanje

### 1. Backend

```bash
cd backend
source venv/bin/activate  # Linux/macOS
# ili
venv\Scripts\activate     # Windows

python app.py
```

Backend će biti dostupan na: `http://localhost:5000`

### 2. Frontend

```bash
cd frontend
npm start
```

Frontend će biti dostupan na: `http://localhost:3000`

### 3. Pristup Aplikaciji

1. Otvorite browser i idite na `http://localhost:3000`
2. Prijavite se sa default kredencijalima:
   - **Username:** admin
   - **Password:** admin123

## Funkcionalnosti

### Kreiranje WireGuard Servera

1. Kliknite "Novi Server" na dashboard-u
2. Unesite naziv servera (npr. "Glavni VPN Server")
3. Unesite IP adresu (npr. "10.0.0.1/24")
4. Kliknite "Kreiraj Server"

### Dodavanje Peer-ova

1. Idite na detalje servera
2. Kliknite "Dodaj Peer"
3. Unesite naziv peer-a (npr. "Mobilni telefon")
4. Kliknite "Dodaj Peer"
5. Skenirajte QR kod sa WireGuard aplikacijom

### Upravljanje Peer-ovima

- **QR Kod:** Prikaži QR kod za skeniranje
- **Kopiraj:** Kopiraj konfiguraciju u clipboard
- **Obriši:** Ukloni peer sa servera

## Troubleshooting

### Česti Problemi

1. **"Connection refused" greška:**
   - Proverite da li je MikroTik CHR dostupan
   - Proverite username/password u config.json
   - Proverite da li je API omogućen na CHR-u

2. **"CORS error" u browser-u:**
   - Proverite da li backend radi na portu 5000
   - Proverite proxy postavke u package.json

3. **"Module not found" greška:**
   - Proverite da li su sve zavisnosti instalirane
   - Pokušajte `pip install -r requirements.txt` ponovo

4. **QR kod se ne prikazuje:**
   - Proverite da li je qrcode biblioteka instalirana
   - Proverite browser konzolu za greške

### Logovi

Backend logovi se prikazuju u konzoli. Za detaljnije logove, dodajte:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

## Sigurnost

### Preporučene Promene

1. **Promenite default kredencijale:**
   ```python
   # U backend/app.py, promenite:
   admin = User(username='your-username', password_hash='your-hashed-password', is_admin=True)
   ```

2. **Koristite HTTPS u produkciji:**
   ```python
   # Dodajte SSL sertifikat
   app.run(debug=False, host='0.0.0.0', port=5000, ssl_context='adhoc')
   ```

3. **Ograničite pristup po IP adresi:**
   ```python
   # U MikroTik-u dodajte firewall pravila
   /ip firewall filter add chain=input src-address=your-ip action=accept
   ```

## Podrška

Za dodatnu podršku ili pitanja:

1. Proverite [FAQ](FAQ.md)
2. Otvorite issue na GitHub-u
3. Kontaktirajte developera

## Licenca

MIT License - pogledajte [LICENSE](LICENSE) fajl za detalje. 