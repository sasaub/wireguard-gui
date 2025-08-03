# 🚀 WireGuard GUI Manager - Brzi Start

## 📋 Šta trebate

1. **Debian 12 VM** u Proxmox-u
2. **MikroTik CHR** u Proxmox-u
3. **IP adrese oba VM-a**
4. **Kredencijali za CHR**

## ⚡ Brza Instalacija (5 minuta)

### 1. Priprema Debian VM-a

```bash
# Pristupite Debian VM-u
ssh root@IP_DEBIAN_VM

# Ažuriranje i instalacija
apt update && apt upgrade -y
apt install -y curl wget git python3 python3-pip python3-venv nodejs npm
```

### 2. Preuzimanje i Instalacija

```bash
# Kreiranje direktorijuma
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Kopiranje fajlova (ako su u trenutnom direktorijumu)
cp -r backend frontend docs scripts README.md LICENSE ./

# Backend setup
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.example.json config.json

# Frontend setup
cd ../frontend
npm install
```

### 3. Konfiguracija

Uredite `/opt/wireguard-gui/backend/config.json`:

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

### 4. Testiranje Konekcije

```bash
# Testiranje sa CHR-om
chmod +x scripts/test-chr-connection.sh
./scripts/test-chr-connection.sh
```

### 5. Pokretanje

```bash
# Terminal 1 - Backend
cd /opt/wireguard-gui/backend
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
cd /opt/wireguard-gui/frontend
npm start
```

### 6. Pristup

- Otvorite browser
- Idite na `http://IP_DEBIAN_VM:3000`
- Login: **admin** / **admin123**

## 🔧 Automatska Instalacija

```bash
# Skripta za automatsku instalaciju
chmod +x scripts/install-debian.sh
./scripts/install-debian.sh
```

## 📱 Korišćenje

### Kreiranje WireGuard Servera

1. Kliknite "Novi Server"
2. Unesite naziv (npr. "Glavni VPN")
3. Unesite IP adresu (npr. "10.0.0.1/24")
4. Kliknite "Kreiraj Server"

### Dodavanje Peer-ova

1. Idite na detalje servera
2. Kliknite "Dodaj Peer"
3. Unesite naziv (npr. "Mobilni telefon")
4. Kliknite "Dodaj Peer"
5. Skenirajte QR kod sa WireGuard aplikacijom

## 🔍 Troubleshooting

### Problem: "Connection refused"
```bash
# Proverite da li je CHR dostupan
ping IP_CHR_A

# Proverite da li je HTTPS omogućen
curl -k https://IP_CHR_A
```

### Problem: "Invalid credentials"
```bash
# Testirajte konekciju
curl -k -u admin:LOZINKA https://IP_CHR_A/rest/system/resource
```

### Problem: "Module not found"
```bash
# Reinstalacija zavisnosti
cd /opt/wireguard-gui/backend
source venv/bin/activate
pip install -r requirements.txt
```

## 📊 Status Servisa

```bash
# Provera statusa
systemctl status wireguard-gui-backend
systemctl status wireguard-gui-frontend

# Logovi
journalctl -u wireguard-gui-backend -f
journalctl -u wireguard-gui-frontend -f
```

## 🆘 Podrška

- 📖 [Detaljna Instalacija](docs/INSTALACIJA_DEBIAN.md)
- 🔍 [CHR Komunikacija](docs/CHR_KOMUNIKACIJA.md)
- ❓ [FAQ](docs/FAQ.md)

---

**Napomena:** Ova aplikacija je dizajnirana za testiranje. Za produkciju preporučujemo dodatne sigurnosne mere. 