# Railway Deployment Guide

## Korak 1: Priprema GitHub repozitorijuma

1. **Push kod na GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Railway deployment"
   git push origin main
   ```

## Korak 2: Railway Setup

1. **Idi na [Railway.app](https://railway.app)**
2. **Prijavi se sa GitHub-om**
3. **Klikni "New Project"**
4. **Izaberi "Deploy from GitHub repo"**
5. **Izaberi svoj repozitorijum**

## Korak 3: Konfiguracija Environment Variables

U Railway dashboard-u, dodaj sledeće environment varijable:

```
RAILWAY_ENVIRONMENT=true
MIKROTIK_HOST=192.168.1.1
MIKROTIK_USERNAME=admin
MIKROTIK_PASSWORD=admin
MIKROTIK_PORT=443
SECRET_KEY=your-secret-key-change-this
JWT_SECRET=jwt-secret-key-change-this
DATABASE_URL=sqlite:///wireguard.db
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
EMAIL_ADDRESS=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM_NAME=VPN Service
```

## Korak 4: Deployment

1. **Railway će automatski detektovati Python aplikaciju**
2. **Instaliraće dependencies iz `requirements.txt`**
3. **Pokrenuće aplikaciju sa `python backend/app.py`**

## Korak 5: Testiranje

1. **Railway će dati URL (npr. `https://your-app.railway.app`)**
2. **Testiraj API: `https://your-app.railway.app/api/servers`**
3. **Login sa: `admin` / `admin123`**

## Korak 6: Custom Domain (Opciono)

1. **U Railway dashboard-u, idi na "Settings"**
2. **Dodaj custom domain**
3. **Konfiguriši DNS**

## Troubleshooting

### Problem: Aplikacija se ne pokreće
- Proveri Railway logs
- Proveri da li su svi dependencies u `requirements.txt`

### Problem: Database error
- Proveri `DATABASE_URL` environment varijablu
- SQLite će se kreirati automatski

### Problem: MikroTik connection
- Proveri `MIKROTIK_*` environment varijable
- Proveri da li je MikroTik dostupan sa Railway servera

## Napomene

- **SQLite** će se koristiti kao baza podataka
- **Admin korisnik** će se kreirati automatski: `admin` / `admin123`
- **SSL** će biti automatski konfigurisan
- **Port** će biti automatski dodeljen od Railway-a 