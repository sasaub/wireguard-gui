#!/bin/bash

# WireGuard GUI Backup Script

BACKUP_DIR="/opt/backups/wireguard-gui"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="wireguard-gui-backup-$DATE.tar.gz"

echo "=== WireGuard GUI Backup ==="

# Create backup directory
mkdir -p $BACKUP_DIR

# Stop services temporarily
echo "Stopping services..."
systemctl stop wireguard-backend wireguard-frontend

# Create backup
echo "Creating backup..."
tar -czf $BACKUP_DIR/$BACKUP_NAME \
    /opt/wireguard-gui/backend \
    /opt/wireguard-gui/frontend \
    /opt/wireguard-gui/scripts \
    /etc/systemd/system/wireguard-backend.service \
    /etc/systemd/system/wireguard-frontend.service \
    /etc/nginx/sites-available/wireguard-gui

# Restart services
echo "Restarting services..."
systemctl start wireguard-backend wireguard-frontend

# Clean old backups (keep last 7 days)
echo "Cleaning old backups..."
find $BACKUP_DIR -name "wireguard-gui-backup-*.tar.gz" -mtime +7 -delete

echo "Backup completed: $BACKUP_DIR/$BACKUP_NAME"
echo "Backup size: $(du -h $BACKUP_DIR/$BACKUP_NAME | cut -f1)" 