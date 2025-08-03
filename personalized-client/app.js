// WireGuard Personalizovani Klijent - MicroElectronic
class WireGuardClient {
    constructor() {
        this.config = null;
        this.isConnected = false;
        this.connectionStartTime = null;
        this.statusCheckInterval = null;
        
        this.init();
        this.setupEventListeners();
    }
    
    async init() {
        try {
            // Pokušaj da učitaj konfiguraciju iz localStorage
            const savedConfig = localStorage.getItem('wg-config');
            if (savedConfig) {
                this.config = JSON.parse(savedConfig);
                console.log('Konfiguracija učitana');
            } else {
                // Ako nema konfiguracije, pokušaj da je preuzme sa servera
                await this.loadConfigFromServer();
            }
            
            // Proveri status povezivanja
            await this.checkConnectionStatus();
            
            // Pokreni periodičnu proveru statusa
            this.startStatusCheck();
            
        } catch (error) {
            console.error('Greška pri inicijalizaciji:', error);
            this.showNotification('Greška pri učitavanju konfiguracije', 'error');
        }
    }
    
    async loadConfigFromServer() {
        try {
            // Ovo bi trebalo da pozove vaš backend API
            const response = await fetch('/api/client/config', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                this.config = await response.json();
                localStorage.setItem('wg-config', JSON.stringify(this.config));
            } else {
                throw new Error('Nije moguće učitati konfiguraciju');
            }
        } catch (error) {
            console.error('Greška pri učitavanju konfiguracije:', error);
            throw error;
        }
    }
    
    setupEventListeners() {
        // Dugmad za povezivanje/odvezivanje
        const connectBtn = document.getElementById('connect-btn');
        const disconnectBtn = document.getElementById('disconnect-btn');
        
        connectBtn.addEventListener('click', () => this.connect());
        disconnectBtn.addEventListener('click', () => this.disconnect());
        
        // PWA instalacija
        this.setupPWAInstall();
    }
    
    async connect() {
        if (!this.config) {
            this.showNotification('Konfiguracija nije učitana', 'error');
            return;
        }
        
        this.showLoading(true);
        
        try {
            const response = await fetch('/api/wireguard/connect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    config: this.config,
                    peer_name: this.config.peer_name || 'client'
                })
            });
            
            if (response.ok) {
                const result = await response.json();
                this.isConnected = true;
                this.connectionStartTime = new Date();
                this.updateUI();
                this.showNotification('Uspešno povezano!', 'success');
            } else {
                const error = await response.json();
                throw new Error(error.message || 'Greška pri povezivanju');
            }
        } catch (error) {
            console.error('Greška pri povezivanju:', error);
            this.showNotification(`Greška pri povezivanju: ${error.message}`, 'error');
        } finally {
            this.showLoading(false);
        }
    }
    
    async disconnect() {
        this.showLoading(true);
        
        try {
            const response = await fetch('/api/wireguard/disconnect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                this.isConnected = false;
                this.connectionStartTime = null;
                this.updateUI();
                this.showNotification('Uspešno odvezano!', 'success');
            } else {
                const error = await response.json();
                throw new Error(error.message || 'Greška pri odvezivanju');
            }
        } catch (error) {
            console.error('Greška pri odvezivanju:', error);
            this.showNotification(`Greška pri odvezivanju: ${error.message}`, 'error');
        } finally {
            this.showLoading(false);
        }
    }
    
    async checkConnectionStatus() {
        try {
            const response = await fetch('/api/wireguard/status', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const status = await response.json();
                this.isConnected = status.is_connected;
                this.connectionStartTime = status.connection_start_time ? 
                    new Date(status.connection_start_time) : null;
                this.updateUI();
            }
        } catch (error) {
            console.error('Greška pri proveri statusa:', error);
        }
    }
    
    updateUI() {
        const statusIcon = document.getElementById('status-icon');
        const statusText = document.getElementById('status-text');
        const connectBtn = document.getElementById('connect-btn');
        const disconnectBtn = document.getElementById('disconnect-btn');
        const connectionInfo = document.getElementById('connection-info');
        const ipAddress = document.getElementById('ip-address');
        const serverName = document.getElementById('server-name');
        const connectionTime = document.getElementById('connection-time');
        
        if (this.isConnected) {
            // Povezan status
            statusIcon.textContent = '🟢';
            statusText.textContent = 'Povezan';
            statusIcon.parentElement.className = 'status-indicator status-connected';
            
            connectBtn.disabled = true;
            disconnectBtn.disabled = false;
            
            // Prikaži informacije o povezivanju
            connectionInfo.style.display = 'block';
            
            if (this.config) {
                ipAddress.textContent = this.config.address || 'N/A';
                serverName.textContent = this.config.server_name || 'N/A';
            }
            
            // Izračunaj vreme povezivanja
            if (this.connectionStartTime) {
                const now = new Date();
                const diff = Math.floor((now - this.connectionStartTime) / 1000);
                const hours = Math.floor(diff / 3600);
                const minutes = Math.floor((diff % 3600) / 60);
                const seconds = diff % 60;
                
                connectionTime.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        } else {
            // Nepovezan status
            statusIcon.textContent = '🔴';
            statusText.textContent = 'Nepovezan';
            statusIcon.parentElement.className = 'status-indicator status-disconnected';
            
            connectBtn.disabled = false;
            disconnectBtn.disabled = true;
            
            // Sakrij informacije o povezivanju
            connectionInfo.style.display = 'none';
        }
    }
    
    startStatusCheck() {
        // Proveri status svakih 5 sekundi
        this.statusCheckInterval = setInterval(() => {
            this.checkConnectionStatus();
        }, 5000);
    }
    
    showLoading(show) {
        const loadingOverlay = document.getElementById('loading-overlay');
        loadingOverlay.style.display = show ? 'flex' : 'none';
    }
    
    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notification-text');
        
        notificationText.textContent = message;
        notification.className = `notification ${type}`;
        notification.style.display = 'flex';
        
        // Automatski sakrij nakon 5 sekundi
        setTimeout(() => {
            this.hideNotification();
        }, 5000);
    }
    
    hideNotification() {
        const notification = document.getElementById('notification');
        notification.style.display = 'none';
    }
    
    setupPWAInstall() {
        // PWA instalacija
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Možete dodati dugme za instalaciju ako želite
            // this.showInstallButton();
        });
        
        window.addEventListener('appinstalled', () => {
            console.log('PWA je instaliran');
            deferredPrompt = null;
        });
    }
    
    // Utility funkcije
    formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
}

// Globalne funkcije
window.hideNotification = function() {
    if (window.wgClient) {
        window.wgClient.hideNotification();
    }
};

// Inicijalizacija aplikacije
document.addEventListener('DOMContentLoaded', () => {
    window.wgClient = new WireGuardClient();
});

// Service Worker za PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registriran:', registration);
            })
            .catch((registrationError) => {
                console.log('SW registracija neuspešna:', registrationError);
            });
    });
} 