// Service Worker za WireGuard Personalizovani Klijent
const CACHE_NAME = 'wg-client-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/manifest.json',
    '/assets/logo.png',
    '/assets/favicon.ico'
];

// Instalacija Service Worker-a
self.addEventListener('install', (event) => {
    console.log('Service Worker instaliran');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache otvoren');
                return cache.addAll(urlsToCache);
            })
    );
});

// Aktivacija Service Worker-a
self.addEventListener('activate', (event) => {
    console.log('Service Worker aktiviran');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Brisanje starog cache-a:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Interceptiranje fetch zahtevima
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Ako je u cache-u, vrati iz cache-a
                if (response) {
                    return response;
                }
                
                // Ako nije u cache-u, pokušaj da preuzme sa mreže
                return fetch(event.request)
                    .then((response) => {
                        // Proveri da li je validan odgovor
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Kloniraj odgovor jer se može koristiti samo jednom
                        const responseToCache = response.clone();
                        
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        // Ako nema mreže, vrati offline stranicu
                        if (event.request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

// Push notifikacije
self.addEventListener('push', (event) => {
    console.log('Push notifikacija primljena');
    
    const options = {
        body: event.data ? event.data.text() : 'Nova notifikacija',
        icon: '/assets/icon-192.png',
        badge: '/assets/icon-72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'connect',
                title: 'Poveži',
                icon: '/assets/connect-icon.png'
            },
            {
                action: 'disconnect',
                title: 'Odvoji',
                icon: '/assets/disconnect-icon.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('WireGuard Klijent', options)
    );
});

// Klik na notifikaciju
self.addEventListener('notificationclick', (event) => {
    console.log('Notifikacija kliknuta');
    
    event.notification.close();
    
    if (event.action === 'connect') {
        // Otvori aplikaciju i poveži
        event.waitUntil(
            clients.openWindow('/?action=connect')
        );
    } else if (event.action === 'disconnect') {
        // Otvori aplikaciju i odvoji
        event.waitUntil(
            clients.openWindow('/?action=disconnect')
        );
    } else {
        // Otvori aplikaciju
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Background sync
self.addEventListener('sync', (event) => {
    console.log('Background sync:', event.tag);
    
    if (event.tag === 'background-sync') {
        event.waitUntil(
            // Ovde možete dodati logiku za sinhronizaciju
            console.log('Background sync izvršen')
        );
    }
});

// Message handling
self.addEventListener('message', (event) => {
    console.log('Message primljen:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
}); 