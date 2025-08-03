#!/bin/bash

echo "🚀 WireGuard GUI Manager - Setup Script"
echo "========================================"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 nije instaliran. Molimo instalirajte Python 3."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js nije instaliran. Molimo instalirajte Node.js."
    exit 1
fi

echo "✅ Python 3 i Node.js su instalirani"

# Setup Backend
echo ""
echo "🔧 Postavljanje Backend-a..."
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create config file if it doesn't exist
if [ ! -f "config.json" ]; then
    cp config.example.json config.json
    echo "📝 Kreiran config.json fajl. Molimo uredite ga sa vašim MikroTik podacima."
fi

echo "✅ Backend je postavljen"

# Setup Frontend
echo ""
echo "🔧 Postavljanje Frontend-a..."
cd ../frontend

# Install dependencies
npm install

echo "✅ Frontend je postavljen"

echo ""
echo "🎉 Setup je završen!"
echo ""
echo "📋 Sledeći koraci:"
echo "1. Uredite backend/config.json sa vašim MikroTik podacima"
echo "2. Pokrenite backend: cd backend && python app.py"
echo "3. Pokrenite frontend: cd frontend && npm start"
echo ""
echo "🌐 Aplikacija će biti dostupna na: http://localhost:3000"
echo "🔑 Default kredencijali: admin / admin123" 