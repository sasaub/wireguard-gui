@echo off
echo 🚀 WireGuard GUI Manager - Setup Script
echo ========================================

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python nije instaliran. Molimo instalirajte Python.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js nije instaliran. Molimo instalirajte Node.js.
    pause
    exit /b 1
)

echo ✅ Python i Node.js su instalirani

REM Setup Backend
echo.
echo 🔧 Postavljanje Backend-a...
cd backend

REM Create virtual environment
python -m venv venv
call venv\Scripts\activate.bat

REM Install dependencies
pip install -r requirements.txt

REM Create config file if it doesn't exist
if not exist "config.json" (
    copy config.example.json config.json
    echo 📝 Kreiran config.json fajl. Molimo uredite ga sa vašim MikroTik podacima.
)

echo ✅ Backend je postavljen

REM Setup Frontend
echo.
echo 🔧 Postavljanje Frontend-a...
cd ..\frontend

REM Install dependencies
npm install

echo ✅ Frontend je postavljen

echo.
echo 🎉 Setup je završen!
echo.
echo 📋 Sledeći koraci:
echo 1. Uredite backend/config.json sa vašim MikroTik podacima
echo 2. Pokrenite backend: cd backend ^&^& python app.py
echo 3. Pokrenite frontend: cd frontend ^&^& npm start
echo.
echo 🌐 Aplikacija će biti dostupna na: http://localhost:3000
echo 🔑 Default kredencijali: admin / admin123
pause 