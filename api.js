// API service for fetching cryptocurrency data
class APIService {
    constructor() {
        this.cache = new Map();
        this.lastFetch = 0;
        this.isLoading = false;
    }

    async fetchPriceData() {
        if (this.isLoading) return this.cache.get('priceData');
        
        const now = Date.now();
        const cacheAge = now - this.lastFetch;
        
        // Use cache if data is less than 30 seconds old
        if (cacheAge < 30000 && this.cache.has('priceData')) {
            return this.cache.get('priceData');
        }

        this.isLoading = true;

        try {
            const [fiatData, cryptoData] = await Promise.all([
                this.fetchFiatData(),
                this.fetchCryptoData()
            ]);

            const priceData = { ...fiatData, ...cryptoData };
            this.cache.set('priceData', priceData);
            this.lastFetch = now;
            
            return priceData;
        } catch (error) {
            console.error('Error fetching price data:', error);
            // Return cached data if available, otherwise return empty object
            return this.cache.get('priceData') || {};
        } finally {
            this.isLoading = false;
        }
    }

    async fetchFiatData() {
        const fiatIds = CONFIG.CURRENCIES.FIAT.map(c => c.cmcId).join(',');
        const vesIds = CONFIG.CURRENCIES.VES_REFERENCES
            .filter(c => c.cmcId)
            .map(c => c.cmcId)
            .join(',');
        
        const allIds = [fiatIds, vesIds].filter(Boolean).join(',');
        
        const url = `${CONFIG.API.COINMARKETCAP_BASE}?id=1&convert_id=${allIds}`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const btcData = data.data['1'];
        
        const prices = {};
        
        // Process fiat currencies
        CONFIG.CURRENCIES.FIAT.forEach(currency => {
            if (btcData.quote[currency.cmcId]) {
                prices[currency.id] = btcData.quote[currency.cmcId].price;
            }
        });
        
        // Process VES references
        CONFIG.CURRENCIES.VES_REFERENCES.forEach(currency => {
            if (currency.cmcId && btcData.quote[currency.cmcId]) {
                prices[currency.id] = btcData.quote[currency.cmcId].price;
            }
        });
        
        return prices;
    }

    async fetchCryptoData() {
        const cryptoIds = CONFIG.CURRENCIES.CRYPTO
            .filter(c => c.cmcId !== '1') // Exclude BTC as it's the base
            .map(c => c.cmcId)
            .join(',');
        
        const url = `${CONFIG.API.COINMARKETCAP_BASE}?id=1&convert_id=1,${cryptoIds}`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const btcData = data.data['1'];
        
        const prices = {};
        
        // BTC is always 1 BTC = 1 BTC
        prices.BTC = 1;
        
        // Process other cryptocurrencies
        CONFIG.CURRENCIES.CRYPTO.forEach(currency => {
            if (currency.id === 'BTC') return;
            
            if (currency.id === 'SAT') {
                prices.SAT = 1 / CONFIG.CONSTANTS.SATOSHI_PER_BTC;
            } else if (btcData.quote[currency.cmcId]) {
                prices[currency.id] = btcData.quote[currency.cmcId].price;
            }
        });
        
        return prices;
    }
}

// Create global API service instance
const apiService = new APIService();