# Railway Deployment - Koraci

## ✅ Pripremljeni fajlovi:

1. **`railway.json`** - Railway konfiguracija
2. **`Procfile`** - Start komanda
3. **`runtime.txt`** - Python verzija
4. **`requirements.txt`** - Python dependencies
5. **`env.example`** - Environment varijable
6. **`RAILWAY_DEPLOYMENT.md`** - Detaljna uputstva
7. **`test_railway.py`** - Test script

## 🔧 Izmene u kodu:

1. **`backend/app.py`** - Dodata Railway konfiguracija
   - Environment varijable za konfiguraciju
   - Port konfiguracija za Railway
   - CORS headers

## 🚀 Koraci za deployment:

### 1. Push na GitHub
```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

### 2. Railway Setup
1. Idi na [railway.app](https://railway.app)
2. Prijavi se sa GitHub-om
3. Klikni "New Project"
4. Izaberi "Deploy from GitHub repo"
5. Izaberi svoj repozitorijum

### 3. Environment Variables
U Railway dashboard-u dodaj:
```
RAILWAY_ENVIRONMENT=true
MIKROTIK_HOST=192.168.1.1
MIKROTIK_USERNAME=admin
MIKROTIK_PASSWORD=admin
MIKROTIK_PORT=443
SECRET_KEY=your-secret-key-change-this
JWT_SECRET=jwt-secret-key-change-this
DATABASE_URL=sqlite:///wireguard.db
```

### 4. Testiranje
- Railway će dati URL (npr. `https://your-app.railway.app`)
- Testiraj: `https://your-app.railway.app/api/servers`
- Login: `admin` / `admin123`

## 📝 Napomene:

- **SQLite** će se koristiti kao baza
- **Admin korisnik** će se kreirati automatski
- **SSL** će biti automatski konfigurisan
- **Port** će biti automatski dodeljen

## 🔍 Troubleshooting:

- Proveri Railway logs ako se ne pokreće
- Proveri environment varijable
- Proveri da li su svi dependencies u `requirements.txt` 