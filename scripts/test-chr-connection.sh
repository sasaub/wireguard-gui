#!/bin/bash

echo "🔍 Testiranje konekcije sa MikroTik CHR-om"
echo "============================================="

# Provera da li je curl instaliran
if ! command -v curl &> /dev/null; then
    echo "❌ curl nije instaliran. Instalirajte ga sa: apt install curl"
    exit 1
fi

# Unos podataka
echo ""
read -p "Unesite IP adresu CHR-a: " CHR_IP
read -p "Unesite username (default: admin): " CHR_USER
CHR_USER=${CHR_USER:-admin}
read -s -p "Unesite password: " CHR_PASS
echo ""

# Test 1: Ping test
echo ""
echo "📡 Test 1: Ping test..."
if ping -c 3 $CHR_IP &> /dev/null; then
    echo "✅ CHR je dostupan (ping uspešan)"
else
    echo "❌ CHR nije dostupan (ping neuspešan)"
    echo "   Proverite:"
    echo "   - Da li je CHR pokrenut"
    echo "   - Da li je IP adresa tačna"
    echo "   - Da li su VM-ovi u istoj mreži"
    exit 1
fi

# Test 2: HTTPS konekcija
echo ""
echo "🔒 Test 2: HTTPS konekcija..."
if curl -k -s --connect-timeout 10 https://$CHR_IP &> /dev/null; then
    echo "✅ HTTPS konekcija uspešna"
else
    echo "❌ HTTPS konekcija neuspešna"
    echo "   Proverite:"
    echo "   - Da li je www-ssl servis omogućen na CHR-u"
    echo "   - Da li je port 443 otvoren"
    exit 1
fi

# Test 3: API autentifikacija
echo ""
echo "🔐 Test 3: API autentifikacija..."
API_RESPONSE=$(curl -k -s -u "$CHR_USER:$CHR_PASS" https://$CHR_IP/rest/system/resource)

if [[ $API_RESPONSE == *"error"* ]]; then
    echo "❌ API autentifikacija neuspešna"
    echo "   Proverite:"
    echo "   - Da li su username/password tačni"
    echo "   - Da li korisnik ima API pristup"
    echo "   - Da li je API omogućen"
    exit 1
else
    echo "✅ API autentifikacija uspešna"
fi

# Test 4: WireGuard podrška
echo ""
echo "🔧 Test 4: WireGuard podrška..."
WG_RESPONSE=$(curl -k -s -u "$CHR_USER:$CHR_PASS" https://$CHR_IP/rest/interface/wireguard)

if [[ $WG_RESPONSE == *"error"* ]]; then
    echo "❌ WireGuard nije podržan ili nije omogućen"
    echo "   Proverite:"
    echo "   - Da li koristite RouterOS 7.x+"
    echo "   - Da li je WireGuard omogućen"
else
    echo "✅ WireGuard je podržan"
fi

# Test 5: Kreiranje test interface-a
echo ""
echo "🧪 Test 5: Testiranje kreiranja interface-a..."
TEST_INTERFACE="wg-test-$(date +%s)"

# Kreiranje test interface-a
CREATE_RESPONSE=$(curl -k -s -X POST -u "$CHR_USER:$CHR_PASS" \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"$TEST_INTERFACE\",\"private-key\":\"test\",\"listen-port\":12345}" \
    https://$CHR_IP/rest/interface/wireguard)

if [[ $CREATE_RESPONSE == *"error"* ]]; then
    echo "❌ Ne mogu kreirati WireGuard interface"
    echo "   Razlog: $CREATE_RESPONSE"
else
    echo "✅ WireGuard interface kreiran uspešno"
    
    # Brisanje test interface-a
    curl -k -s -X DELETE -u "$CHR_USER:$CHR_PASS" \
        https://$CHR_IP/rest/interface/wireguard/$TEST_INTERFACE &> /dev/null
    echo "   Test interface obrisan"
fi

# Prikaz informacija
echo ""
echo "📊 Informacije o CHR-u:"
RESOURCE_INFO=$(curl -k -s -u "$CHR_USER:$CHR_PASS" https://$CHR_IP/rest/system/resource)
echo "$RESOURCE_INFO" | python3 -m json.tool 2>/dev/null || echo "$RESOURCE_INFO"

echo ""
echo "🎉 Svi testovi su prošli uspešno!"
echo ""
echo "📝 Konfiguracija za config.json:"
echo "{"
echo "  \"mikrotik\": {"
echo "    \"host\": \"$CHR_IP\","
echo "    \"username\": \"$CHR_USER\","
echo "    \"password\": \"$CHR_PASS\","
echo "    \"port\": 443"
echo "  }"
echo "}"
echo ""
echo "💡 Sada možete pokrenuti GUI aplikaciju!" 