# Frontend Railway Deployment Guide

## 🚀 **Korak 1: Priprema frontend-a za deployment**

Frontend je već pripremljen sa sledećim fajlovima:
- `frontend/railway.json` - Railway konfiguracija
- `frontend/Procfile` - Start komanda
- `frontend/runtime.txt` - Node.js verzija
- `frontend/src/setupProxy.js` - Proxy za backend API

## 🎯 **Korak 2: Push frontend-a na GitHub**

```bash
# Dodaj sve fajlove
git add .

# Commit promene
git commit -m "Add frontend deployment configuration"

# Push na GitHub
git push origin main
```

## 🚀 **Korak 3: Railway Frontend Setup**

1. **Idi na [Railway.app](https://railway.app)**
2. **Klikni "New Project"**
3. **Izaberi "Deploy from GitHub repo"**
4. **Izaberi isti repozitorijum**
5. **U "Root Directory" stavi: `frontend`**
6. **Klikni "Deploy"**

## ⚙️ **Korak 4: Konfiguracija**

Railway će automatski:
- Detektovati da je React aplikacija
- Instalirati dependencies
- Pokrenuti `npm start`

## 🔗 **Korak 5: Povezivanje sa Backend-om**

Frontend će se automatski povezati sa backend-om preko:
- `setupProxy.js` - proxy-uje `/api` zahteve na backend
- Backend URL: `https://wireguard-gui-production.up.railway.app`

## 🎯 **Korak 6: Testiranje**

1. **Railway će dati URL za frontend** (npr. `https://frontend-production.up.railway.app`)
2. **Otvori URL u browser-u**
3. **Uloguj se sa:**
   - Username: `admin`
   - Password: `admin123`

## ✅ **Očekivani rezultat:**

- Frontend će se povezati sa backend-om
- Login će raditi
- Videćeš sve servere sa MikroTik-a
- Sve funkcionalnosti će raditi preko javne URL adrese

## 🔧 **Troubleshooting:**

Ako ne radi:
1. **Proveri Railway logs** - klikni na frontend service
2. **Proveri da li backend radi** - testiraj backend URL
3. **Proveri proxy konfiguraciju** - `setupProxy.js`

## 🎉 **Uspešan deployment:**

Nakon uspešnog deployment-a, imaćeš:
- **Backend:** `https://wireguard-gui-production.up.railway.app`
- **Frontend:** `https://frontend-production.up.railway.app`

Obe aplikacije će biti javno dostupne i povezane! 