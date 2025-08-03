#!/bin/bash

# WireGuard GUI Production Installation Script
# Run as root on Debian 12

set -e

echo "=== WireGuard GUI Production Installation ==="

# Update system
echo "Updating system packages..."
apt update && apt upgrade -y

# Install required packages
echo "Installing required packages..."
apt install -y nginx certbot python3-certbot-nginx nodejs npm python3-venv python3-pip ufw

# Create application directory
echo "Creating application directory..."
mkdir -p /opt/wireguard-gui
chown www-data:www-data /opt/wireguard-gui

# Copy application files (assuming they're in current directory)
echo "Copying application files..."
cp -r backend /opt/wireguard-gui/
cp -r frontend /opt/wireguard-gui/
chown -R www-data:www-data /opt/wireguard-gui

# Setup Python virtual environment
echo "Setting up Python virtual environment..."
cd /opt/wireguard-gui/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Setup Node.js dependencies
echo "Setting up Node.js dependencies..."
cd /opt/wireguard-gui/frontend
npm install

# Build frontend for production
echo "Building frontend for production..."
npm run build

# Install systemd services
echo "Installing systemd services..."
cp /opt/wireguard-gui/scripts/wireguard-backend.service /etc/systemd/system/
cp /opt/wireguard-gui/scripts/wireguard-frontend.service /etc/systemd/system/

# Reload systemd
systemctl daemon-reload

# Enable services
echo "Enabling services..."
systemctl enable wireguard-backend.service
systemctl enable wireguard-frontend.service

# Generate SSL certificate
echo "Generating SSL certificate..."
chmod +x /opt/wireguard-gui/scripts/generate-ssl.sh
/opt/wireguard-gui/scripts/generate-ssl.sh

# Configure Nginx
echo "Configuring Nginx..."
cp /opt/wireguard-gui/scripts/nginx-wireguard.conf /etc/nginx/sites-available/wireguard-gui
ln -sf /etc/nginx/sites-available/wireguard-gui /etc/nginx/sites-enabled/

# Remove default nginx site
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Configure firewall
echo "Configuring firewall..."
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# Create database
echo "Creating database..."
cd /opt/wireguard-gui/backend
source venv/bin/activate
python create_db.py

echo "=== Installation completed! ==="
echo ""
echo "Next steps:"
echo "1. Edit /opt/wireguard-gui/backend/config.json with your settings"
echo "2. Edit /etc/nginx/sites-available/wireguard-gui with your domain"
echo "3. Get SSL certificate: certbot --nginx -d yourdomain.com"
echo "4. Start services: systemctl start wireguard-backend wireguard-frontend"
echo "5. Check status: systemctl status wireguard-backend wireguard-frontend" 