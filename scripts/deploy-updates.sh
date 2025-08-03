#!/bin/bash

# Deploy updates for new peer functionality and static routes

echo "Deploying updates..."

# Copy backend files
echo "Copying backend files..."
scp backend/app.py user@192.168.111.199:/opt/wireguard-gui/backend/
scp backend/migrate_db.py user@192.168.111.199:/opt/wireguard-gui/backend/

# Copy frontend files
echo "Copying frontend files..."
scp frontend/src/components/ServerDetail.js user@192.168.111.199:/opt/wireguard-gui/frontend/src/components/

# Run migration on server
echo "Running database migration..."
ssh user@192.168.111.199 "cd /opt/wireguard-gui/backend && python3 migrate_db.py"

# Restart services
echo "Restarting services..."
ssh user@192.168.111.199 "sudo systemctl restart wireguard-backend"
ssh user@192.168.111.199 "sudo systemctl restart wireguard-frontend"

echo "Deployment completed!" 