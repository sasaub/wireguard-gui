#!/bin/bash

# WireGuard GUI Monitoring Script

echo "=== WireGuard GUI Status ==="
echo ""

# Check systemd services
echo "Service Status:"
systemctl status wireguard-backend --no-pager -l
echo ""
systemctl status wireguard-frontend --no-pager -l
echo ""

# Check if processes are running
echo "Process Status:"
if pgrep -f "python.*app.py" > /dev/null; then
    echo "✓ Backend is running"
else
    echo "✗ Backend is not running"
fi

if pgrep -f "npm.*start" > /dev/null; then
    echo "✓ Frontend is running"
else
    echo "✗ Frontend is not running"
fi

# Check ports
echo ""
echo "Port Status:"
if netstat -tlnp | grep :5000 > /dev/null; then
    echo "✓ Backend API (port 5000) is listening"
else
    echo "✗ Backend API (port 5000) is not listening"
fi

if netstat -tlnp | grep :3000 > /dev/null; then
    echo "✓ Frontend (port 3000) is listening"
else
    echo "✗ Frontend (port 3000) is not listening"
fi

# Check Nginx
echo ""
echo "Nginx Status:"
systemctl status nginx --no-pager -l

# Check recent logs
echo ""
echo "Recent Backend Logs:"
journalctl -u wireguard-backend -n 10 --no-pager

echo ""
echo "Recent Frontend Logs:"
journalctl -u wireguard-frontend -n 10 --no-pager 