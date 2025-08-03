# WireGuard GUI Manager - Instalacija na Debian 12 VM

## 🎯 Korak 1: Priprema Debian 12 VM-a

### 1.1 Pristup VM-u
```bash
# Pristupite vašem Debian 12 VM-u u Proxmox-u
# Možete koristiti konzolu ili SSH
ssh root@IP_ADRESA_DEBIAN_VM
```

### 1.2 Ažuriranje sistema
```bash
# Ažuriranje paketa
apt update && apt upgrade -y

# Instalacija potrebnih alata
apt install -y curl wget git python3 python3-pip python3-venv nodejs npm
```

### 1.3 Provera instalacije
```bash
# Proverite verzije
python3 --version  # Trebalo bi biti 3.9+
node --version     # Trebalo bi biti 16+
npm --version      # Trebalo bi biti 8+
```

## 🎯 Korak 2: Preuzimanje i Instalacija Aplikacije

### 2.1 Kloniranje projekta
```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Preuzimanje projekta (ako je na GitHub-u)
git clone https://github.com/your-username/WGGUI.git .
# ILI kopirajte fajlove ručno ako nemate git
```

### 2.2 Backend Setup
```bash
cd backend

# Kreiranje virtualnog okruženja
python3 -m venv venv

# Aktivacija virtualnog okruženja
source venv/bin/activate

# Instalacija zavisnosti
pip install -r requirements.txt

# Kopiranje konfiguracionog fajla
cp config.example.json config.json
```

### 2.3 Frontend Setup
```bash
cd ../frontend

# Instalacija Node.js zavisnosti
npm install
```

## 🎯 Korak 3: Konfiguracija

### 3.1 Konfiguracija Backend-a
Uredite `backend/config.json`:

```json
{
  "mikrotik": {
    "host": "IP_ADRESA_CHR_MIKROTIK",
    "username": "admin",
    "password": "VAŠA_LOZINKA_CHR",
    "port": 443
  },
  "app": {
    "secret_key": "promenite-ovu-vrednost",
    "jwt_secret": "promenite-ovu-vrednost",
    "debug": true,
    "host": "0.0.0.0",
    "port": 5000
  },
  "database": {
    "uri": "sqlite:///wireguard.db"
  }
}
```

**VAŽNO:** Zamenite sledeće vrednosti:
- `IP_ADRESA_CHR_MIKROTIK` - IP adresa vašeg CHR-a u Proxmox-u
- `VAŠA_LOZINKA_CHR` - Lozinka vašeg CHR-a
- `promenite-ovu-vrednost` - Generišite slučajne stringove za sigurnost

### 3.2 Provera konekcije sa CHR-om
```bash
# Testirajte konekciju sa CHR-om
curl -k -u admin:VAŠA_LOZINKA_CHR https://IP_ADRESA_CHR_MIKROTIK/rest/system/resource
```

## 🎯 Korak 4: Pokretanje Aplikacije

### 4.1 Pokretanje Backend-a
```bash
cd /opt/wireguard-gui/backend
source venv/bin/activate
python3 app.py
```

Backend će biti dostupan na: `http://IP_DEBIAN_VM:5000`

### 4.2 Pokretanje Frontend-a (u novom terminalu)
```bash
cd /opt/wireguard-gui/frontend
npm start
```

Frontend će biti dostupan na: `http://IP_DEBIAN_VM:3000`

### 4.3 Pristup Aplikaciji
1. Otvorite browser
2. Idite na `http://IP_DEBIAN_VM:3000`
3. Prijavite se sa: **admin** / **admin123**

## 🎯 Korak 5: Automatsko Pokretanje (Opciono)

### 5.1 Kreiranje systemd servisa za Backend
```bash
sudo nano /etc/systemd/system/wireguard-gui-backend.service
```

Dodajte sledeći sadržaj:
```ini
[Unit]
Description=WireGuard GUI Backend
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/wireguard-gui/backend
Environment=PATH=/opt/wireguard-gui/backend/venv/bin
ExecStart=/opt/wireguard-gui/backend/venv/bin/python app.py
Restart=always

[Install]
WantedBy=multi-user.target
```

### 5.2 Kreiranje systemd servisa za Frontend
```bash
sudo nano /etc/systemd/system/wireguard-gui-frontend.service
```

Dodajte sledeći sadržaj:
```ini
[Unit]
Description=WireGuard GUI Frontend
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/wireguard-gui/frontend
ExecStart=/usr/bin/npm start
Restart=always

[Install]
WantedBy=multi-user.target
```

### 5.3 Omogućavanje servisa
```bash
# Omogućavanje servisa
sudo systemctl enable wireguard-gui-backend
sudo systemctl enable wireguard-gui-frontend

# Pokretanje servisa
sudo systemctl start wireguard-gui-backend
sudo systemctl start wireguard-gui-frontend

# Provera statusa
sudo systemctl status wireguard-gui-backend
sudo systemctl status wireguard-gui-frontend
```

## 🔧 Troubleshooting

### Problem: "Connection refused" sa CHR-om
```bash
# Proverite da li je CHR dostupan
ping IP_ADRESA_CHR_MIKROTIK

# Proverite da li je API omogućen
curl -k https://IP_ADRESA_CHR_MIKROTIK/rest/system/resource
```

### Problem: "Module not found"
```bash
# Reinstalacija zavisnosti
cd /opt/wireguard-gui/backend
source venv/bin/activate
pip install -r requirements.txt
```

### Problem: Portovi su zauzeti
```bash
# Proverite koji procesi koriste portove
netstat -tulpn | grep :5000
netstat -tulpn | grep :3000

# Zaustavite procese ako je potrebno
sudo kill -9 PID_PROCESA
```

## 📋 Checklist

- [ ] Debian 12 VM je ažuriran
- [ ] Python 3.9+ je instaliran
- [ ] Node.js 16+ je instaliran
- [ ] Projekat je kloniran
- [ ] Backend zavisnosti su instalirane
- [ ] Frontend zavisnosti su instalirane
- [ ] config.json je konfigurisan
- [ ] Konekcija sa CHR-om radi
- [ ] Backend pokrenut na portu 5000
- [ ] Frontend pokrenut na portu 3000
- [ ] Aplikacija dostupna u browser-u
- [ ] Login radi sa admin/admin123

## 🆘 Podrška

Ako imate problema:
1. Proverite logove: `sudo journalctl -u wireguard-gui-backend`
2. Proverite konekciju sa CHR-om
3. Proverite firewall pravila
4. Kontaktirajte podršku 