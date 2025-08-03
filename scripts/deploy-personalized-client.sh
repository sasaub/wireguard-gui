#!/bin/bash

# Deploy personalized client functionality

echo "Deploying personalized client functionality..."

# Copy backend files
echo "Copying backend files..."
scp backend/app.py user@192.168.111.199:/opt/wireguard-gui/backend/
scp backend/personalized_client_api.py user@192.168.111.199:/opt/wireguard-gui/backend/
scp -r backend/personalized-client user@192.168.111.199:/opt/wireguard-gui/backend/

# Copy frontend files
echo "Copying frontend files..."
scp frontend/src/components/ServerDetail.js user@192.168.111.199:/opt/wireguard-gui/frontend/src/components/

# Create generated-clients directory on server
echo "Creating generated-clients directory..."
ssh user@192.168.111.199 "mkdir -p /opt/wireguard-gui/backend/generated-clients"

# Restart services
echo "Restarting services..."
ssh user@192.168.111.199 "sudo systemctl restart wireguard-backend"
ssh user@192.168.111.199 "sudo systemctl restart wireguard-frontend"

echo "Personalized client deployment completed!" 