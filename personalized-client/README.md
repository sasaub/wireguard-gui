# WireGuard Personalizovani Klijent - MicroElectronic

## 📋 Opis

Personalizovani WireGuard VPN klijent koji omogućava jednostavno povezivanje sa korporativnom mrežom. Aplikacija je dizajnirana da bude jednostavna za krajnje korisnike - samo status povezivanja i dugmad za povezivanje/odvezivanje.

## ✨ Funkcionalnosti

- **Jednostavan interfejs** - samo status i dugmad
- **PWA podrška** - može se instalirati kao aplikacija
- **Offline funkcionalnost** - radi i bez interneta
- **Mobilna podrška** - radi na Android/iOS uređajima
- **MicroElectronic branding** - personalizovan sa logom firme
- **Automatsko povezivanje** - WireGuard se pokreće automatski

## 🚀 Kako koristiti

### Za administratora:

1. **Kreirajte peer** u glavnoj WireGuard aplikaciji
2. **Generišite personalizovani klijent** klikom na "Generiši klijent"
3. **Preuzmite ZIP fajl** sa klijent aplikacijom
4. **Pošaljite klijentu** putem email-a

### Za klijenta:

1. **Raspakujte ZIP fajl** na računar
2. **Otvorite index.html** u browser-u
3. **Instalirajte kao PWA** (opciono)
4. **Kliknite "Poveži"** za povezivanje
5. **Kliknite "Odvoji"** za odvezivanje

## 📱 PWA instalacija

### Desktop:
1. Otvorite aplikaciju u Chrome/Edge
2. Kliknite na ikonu instalacije u adresnoj traci
3. Izaberite "Instaliraj"

### Mobilni uređaji:
1. Otvorite u Chrome/Safari
2. Dodajte na početni ekran
3. Aplikacija će se ponašati kao native app

## 🛠️ Tehnički detalji

### Struktura fajlova:
```
personalized-client/
├── index.html          # Glavna stranica
├── styles.css          # Stilizacija
├── app.js             # JavaScript logika
├── manifest.json      # PWA manifest
├── sw.js             # Service Worker
└── assets/           # Slike i ikone
    ├── logo.png      # MicroElectronic logo
    ├── favicon.ico   # Favicon
    └── icons/        # PWA ikone
```

### API endpoint-i:
- `POST /api/wireguard/connect` - Povezivanje
- `POST /api/wireguard/disconnect` - Odvezivanje
- `GET /api/wireguard/status` - Status provera
- `GET /api/client/config` - Učitavanje konfiguracije

## 🔧 Konfiguracija

### Backend integracija:
1. Dodajte `personalized_client_api.py` u backend
2. Registrujte blueprint u glavnoj aplikaciji
3. Kreirajte endpoint za generisanje klijenata

### Personalizacija:
- **Logo**: Zamenite `assets/logo.png`
- **Boje**: Izmenite CSS varijable u `styles.css`
- **Tekst**: Izmenite tekstove u `index.html`

## 📦 Deployment

### Lokalno testiranje:
```bash
# Pokrenite lokalni server
python -m http.server 8000

# Otvorite u browser-u
http://localhost:8000
```

### Produkcija:
1. Postavite na web server (nginx, Apache)
2. Konfigurišite HTTPS (obavezno za PWA)
3. Registrujte Service Worker

## 🔒 Sigurnost

- **HTTPS obavezan** za PWA funkcionalnost
- **Konfiguracija enkriptovana** u localStorage
- **WireGuard protokol** - najmoderniji VPN protokol
- **Bez logovanja** - aplikacija ne čuva osetljive podatke

## 🐛 Troubleshooting

### Aplikacija se ne povezuje:
1. Proverite da li je WireGuard instaliran
2. Proverite konfiguraciju u `config.json`
3. Proverite firewall podešavanja

### PWA se ne instalira:
1. Proverite da li koristite HTTPS
2. Proverite manifest.json
3. Proverite Service Worker registraciju

### Mobilni uređaji:
1. Koristite Chrome/Safari
2. Proverite "Dodaj na početni ekran"
3. Proverite dozvole za mrežu

## 📞 Podrška

Za tehničku podršku kontaktirajte:
- **Email**: support@microelectronic.com
- **Telefon**: +381 11 123 456
- **Website**: www.microelectronic.com

## 📄 Licenca

© 2024 MicroElectronic. Sva prava zadržana.

---

**Razvijeno od strane MicroElectronic tima** 