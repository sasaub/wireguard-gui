# Često Postavljana Pitanja (FAQ)

## Opšta Pitanja

### Q: Šta je WireGuard GUI Manager?
**A:** WireGuard GUI Manager je web aplikacija koja omogućava jednostavno upravljanje WireGuard VPN serverima kroz grafički interfejs. Posebno je dizajnirana za rad sa MikroTik CHR (Cloud Hosted Router) i omogućava korisnicima bez predznanja da kreiraju i upravljaju VPN serverima.

### Q: Zašto koristiti ovu aplikaciju umesto direktno MikroTik WebFig-a?
**A:** Ova aplikacija je dizajnirana za:
- **Jednostavnost:** Korisnici bez predznanja mogu lako kreirati VPN servere
- **Multi-tenant:** Svaki korisnik ima svoj server i peer-ove
- **QR kodovi:** Automatsko generisanje QR kodova za brzo povezivanje
- **Moderna UI:** Lepši i intuitivniji interfejs od WebFig-a

### Q: Da li je aplikacija besplatna?
**A:** Da, aplikacija je open-source i besplatna za korišćenje pod MIT licencom.

## Tehnička Pitanja

### Q: Koje verzije RouterOS-a su podržane?
**A:** Aplikacija zahteva RouterOS 7.x ili noviji, jer WireGuard podrška je dodata tek u verziji 7.

### Q: Koliko peer-ova mogu dodati na jedan server?
**A:** Teoretski neograničeno, ali praktično zavisi od:
- Hardvera CHR-a (CPU, RAM)
- Mrežne brzine
- RouterOS licence (L1, L4, L5, L6)

### Q: Da li aplikacija podržava IPv6?
**A:** Trenutno aplikacija fokusirana na IPv4, ali IPv6 podrška je planirana za buduće verzije.

### Q: Kako da backup-ujem konfiguraciju?
**A:** Konfiguracija se čuva u SQLite bazi (`backend/wireguard.db`). Možete:
- Kopirati ceo `backend/` folder
- Export-ovati bazu: `sqlite3 wireguard.db .dump > backup.sql`

## Instalacija i Setup

### Q: Da li mogu koristiti aplikaciju bez Proxmox-a?
**A:** Da, možete koristiti bilo koji hypervisor (VMware, VirtualBox, KVM) ili čak fizički MikroTik router.

### Q: Koji portovi trebaju biti otvoreni?
**A:** 
- **Backend:** Port 5000 (možete promeniti u config.json)
- **Frontend:** Port 3000 (možete promeniti u package.json)
- **MikroTik CHR:** Port 443 (za API pristup)

### Q: Da li aplikacija radi na Windows-u?
**A:** Da, aplikacija radi na Windows-u, Linux-u i macOS-u. Koristite `scripts/setup.bat` za Windows setup.

### Q: Kako da promenim default kredencijale?
**A:** U `backend/app.py` nađite liniju:
```python
admin = User(username='admin', password_hash='admin123', is_admin=True)
```
I promenite je sa svojim kredencijalima.

## Korišćenje

### Q: Kako da dodam peer na server?
**A:** 
1. Idite na detalje servera
2. Kliknite "Dodaj Peer"
3. Unesite naziv (npr. "Mobilni telefon")
4. Kliknite "Dodaj Peer"
5. Skenirajte QR kod sa WireGuard aplikacijom

### Q: Kako da obrišem peer?
**A:** 
1. Idite na detalje servera
2. Nađite peer u listi
3. Kliknite ikonicu za brisanje (🗑️)
4. Potvrdite brisanje

### Q: Kako da kopiram konfiguraciju peer-a?
**A:** 
1. Idite na detalje servera
2. Nađite peer u listi
3. Kliknite ikonicu za kopiranje (📋)
4. Konfiguracija će biti kopirana u clipboard

### Q: Šta ako QR kod ne radi?
**A:** 
1. Proverite da li je qrcode biblioteka instalirana
2. Pokušajte da kopirate konfiguraciju ručno
3. Proverite da li je server dostupan sa interneta

## Troubleshooting

### Q: "Connection refused" greška
**A:** 
1. Proverite da li je MikroTik CHR dostupan
2. Proverite IP adresu u config.json
3. Proverite da li je API omogućen na CHR-u
4. Proverite firewall pravila

### Q: "Invalid credentials" greška
**A:** 
1. Proverite username/password u config.json
2. Proverite da li korisnik ima admin privilegije na CHR-u
3. Pokušajte da se ulogujete preko WebFig-a

### Q: QR kod se ne prikazuje
**A:** 
1. Proverite da li je qrcode biblioteka instalirana: `pip install qrcode[pil]`
2. Proverite browser konzolu za greške
3. Pokušajte da kopirate konfiguraciju ručno

### Q: Peer se ne povezuje
**A:** 
1. Proverite da li je server aktivan
2. Proverite da li je port otvoren (51820+)
3. Proverite da li je endpoint adresa tačna
4. Proverite firewall pravila na klijentu

### Q: Spora brzina konekcije
**A:** 
1. Proverite hardver CHR-a (CPU, RAM)
2. Proverite mrežnu brzinu
3. Proverite da li je MTU podešen (1420)
4. Proverite da li nema drugih aplikacija koje troše resurse

## Sigurnost

### Q: Da li je aplikacija sigurna?
**A:** Aplikacija koristi:
- JWT tokeni za autentifikaciju
- HTTPS za komunikaciju sa MikroTik-om
- SQLite bazu za čuvanje podataka
- WireGuard protokol za VPN (veoma siguran)

### Q: Kako da omogućim HTTPS?
**A:** 
1. Instalirajte SSL sertifikat
2. Dodajte u `backend/app.py`:
```python
app.run(debug=False, host='0.0.0.0', port=5000, ssl_context='adhoc')
```

### Q: Kako da ograničim pristup po IP adresi?
**A:** 
1. U MikroTik-u dodajte firewall pravila
2. Ograničite pristup samo na vašu IP adresu
3. Koristite VPN za pristup

## Performanse

### Q: Koliko peer-ova može jedan CHR da podrži?
**A:** Zavisi od:
- **L1 licenca:** Do 1 Mbps (testiranje)
- **L4 licenca:** Do 1 Gbps (većina slučajeva)
- **L5 licenca:** Do 10 Gbps (velike instalacije)
- **L6 licenca:** Neograničeno (ISP)

### Q: Kako da optimizujem performanse?
**A:** 
1. Koristite snažniji hardver za CHR
2. Podesite MTU na 1420
3. Koristite PersistentKeepalive=25
4. Ograničite broj aktivnih peer-ova

### Q: Da li aplikacija podržava load balancing?
**A:** Trenutno ne, ali je planirano za buduće verzije.

## Podrška

### Q: Gde mogu da nađem dodatnu pomoć?
**A:** 
1. Proverite [dokumentaciju](INSTALACIJA.md)
2. Otvorite issue na GitHub-u
3. Kontaktirajte developera

### Q: Kako da prijavim bug?
**A:** 
1. Opisite problem detaljno
2. Uključite logove
3. Opisite korake za reprodukciju
4. Otvorite issue na GitHub-u

### Q: Da li mogu da doprinosim projektu?
**A:** Da! Možete:
1. Fork-ovati repository
2. Napraviti feature branch
3. Implementirati promene
4. Poslati pull request

## Buduće Funkcionalnosti

### Q: Koje funkcionalnosti su planirane?
**A:** 
- IPv6 podrška
- Load balancing
- Automatski backup
- Email notifikacije
- Detaljniji monitoring
- API dokumentacija
- Docker podrška 