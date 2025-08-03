#!/bin/bash

# Setup Cron Jobs for WireGuard GUI

echo "=== Setting up Cron Jobs ==="

# Add backup job (daily at 2 AM)
(crontab -l 2>/dev/null; echo "0 2 * * * /opt/wireguard-gui/scripts/backup.sh >> /var/log/wireguard-backup.log 2>&1") | crontab -

# Add monitoring job (every 5 minutes)
(crontab -l 2>/dev/null; echo "*/5 * * * * /opt/wireguard-gui/scripts/monitor.sh >> /var/log/wireguard-monitor.log 2>&1") | crontab -

# Add log rotation
(crontab -l 2>/dev/null; echo "0 3 * * * find /var/log -name 'wireguard-*.log' -size +10M -exec truncate -s 0 {} \;") | crontab -

echo "Cron jobs installed:"
echo "- Daily backup at 2 AM"
echo "- Monitoring every 5 minutes"
echo "- Log rotation at 3 AM"

echo ""
echo "Current cron jobs:"
crontab -l 