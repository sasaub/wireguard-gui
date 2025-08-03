#!/bin/bash

# Generate Self-Signed SSL Certificate for WireGuard GUI

echo "=== Generating Self-Signed SSL Certificate ==="

# Create SSL directory
mkdir -p /etc/ssl/private
mkdir -p /etc/ssl/certs

# Generate private key
openssl genrsa -out /etc/ssl/private/wireguard.key 2048

# Generate certificate
openssl req -new -x509 -key /etc/ssl/private/wireguard.key \
    -out /etc/ssl/certs/wireguard.crt \
    -days 365 \
    -subj "/C=RS/ST=Serbia/L=Belgrade/O=WireGuard GUI/CN=192.168.111.199"

# Set proper permissions
chmod 600 /etc/ssl/private/wireguard.key
chmod 644 /etc/ssl/certs/wireguard.crt

echo "SSL certificate generated successfully!"
echo "Certificate: /etc/ssl/certs/wireguard.crt"
echo "Private key: /etc/ssl/private/wireguard.key" 