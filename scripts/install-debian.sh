#!/bin/bash

echo "🚀 WireGuard GUI Manager - Debian 12 Instalacija"
echo "=================================================="

# Provera da li je root
if [ "$EUID" -ne 0 ]; then
    echo "❌ Ova skripta mora biti pokrenuta kao root"
    exit 1
fi

# Korak 1: Ažuriranje sistema
echo ""
echo "📦 Ažuriranje sistema..."
apt update && apt upgrade -y

# Korak 2: Instalacija potrebnih paketa
echo ""
echo "🔧 Instalacija potrebnih paketa..."
apt install -y curl wget git python3 python3-pip python3-venv nodejs npm

# Provera instalacije
echo ""
echo "✅ Provera instalacije..."
python3 --version
node --version
npm --version

# Korak 3: Kreiranje direktorijuma
echo ""
echo "📁 Kreiranje direktorijuma..."
mkdir -p /opt/wireguard-gui
cd /opt/wireguard-gui

# Korak 4: Kopiranje fajlova (ako postoje u trenutnom direktorijumu)
if [ -d "backend" ] && [ -d "frontend" ]; then
    echo "📋 Kopiranje postojećih fajlova..."
    cp -r backend /opt/wireguard-gui/
    cp -r frontend /opt/wireguard-gui/
    cp -r docs /opt/wireguard-gui/
    cp README.md /opt/wireguard-gui/
    cp LICENSE /opt/wireguard-gui/
else
    echo "⚠️  Fajlovi nisu pronađeni u trenutnom direktorijumu"
    echo "   Molimo kopirajte fajlove ručno u /opt/wireguard-gui/"
    echo "   Ili klonirajte sa GitHub-a:"
    echo "   git clone https://github.com/your-username/WGGUI.git /opt/wireguard-gui"
fi

cd /opt/wireguard-gui

# Korak 5: Backend Setup
echo ""
echo "🐍 Backend Setup..."
cd backend

# Kreiranje virtualnog okruženja
python3 -m venv venv

# Aktivacija virtualnog okruženja
source venv/bin/activate

# Instalacija zavisnosti
pip install -r requirements.txt

# Kopiranje konfiguracionog fajla
if [ ! -f "config.json" ]; then
    cp config.example.json config.json
    echo "📝 Kreiran config.json fajl"
fi

# Korak 6: Frontend Setup
echo ""
echo "⚛️  Frontend Setup..."
cd ../frontend

# Instalacija Node.js zavisnosti
npm install

# Korak 7: Kreiranje systemd servisa
echo ""
echo "🔧 Kreiranje systemd servisa..."

# Backend servis
cat > /etc/systemd/system/wireguard-gui-backend.service << EOF
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
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Frontend servis
cat > /etc/systemd/system/wireguard-gui-frontend.service << EOF
[Unit]
Description=WireGuard GUI Frontend
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/wireguard-gui/frontend
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Omogućavanje servisa
systemctl daemon-reload
systemctl enable wireguard-gui-backend
systemctl enable wireguard-gui-frontend

echo ""
echo "🎉 Instalacija završena!"
echo ""
echo "📋 Sledeći koraci:"
echo "1. Uredite /opt/wireguard-gui/backend/config.json sa vašim CHR podacima"
echo "2. Pokrenite servise:"
echo "   systemctl start wireguard-gui-backend"
echo "   systemctl start wireguard-gui-frontend"
echo "3. Proverite status:"
echo "   systemctl status wireguard-gui-backend"
echo "   systemctl status wireguard-gui-frontend"
echo "4. Pristupite aplikaciji: http://IP_DEBIAN_VM:3000"
echo "5. Login: admin / admin123"
echo ""
echo "🔧 Za ručno pokretanje:"
echo "   cd /opt/wireguard-gui/backend && source venv/bin/activate && python app.py"
echo "   cd /opt/wireguard-gui/frontend && npm start" 