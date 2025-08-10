// Calculator service for currency conversions
class Calculator {
    constructor() {
        this.prices = {};
        this.baseCurrency = 'BTC';
    }

    updatePrices(newPrices) {
        this.prices = { ...newPrices };
    }

    convertFromTo(amount, fromCurrency, toCurrency) {
        if (!this.prices[fromCurrency] || !this.prices[toCurrency]) {
            return 0;
        }

        // Convert to BTC first, then to target currency
        const btcAmount = this.convertToBTC(amount, fromCurrency);
        return this.convertFromBTC(btcAmount, toCurrency);
    }

    convertToBTC(amount, fromCurrency) {
        if (fromCurrency === 'BTC') return amount;
        if (fromCurrency === 'SAT') return amount / CONFIG.CONSTANTS.SATOSHI_PER_BTC;
        
        const price = this.prices[fromCurrency];
        if (!price) return 0;
        
        return amount / price;
    }

    convertFromBTC(btcAmount, toCurrency) {
        if (toCurrency === 'BTC') return btcAmount;
        if (toCurrency === 'SAT') return btcAmount * CONFIG.CONSTANTS.SATOSHI_PER_BTC;
        
        const price = this.prices[toCurrency];
        if (!price) return 0;
        
        return btcAmount * price;
    }

    getAllConversions(amount, fromCurrency) {
        const conversions = {};
        
        // Convert to all fiat currencies
        CONFIG.CURRENCIES.FIAT.forEach(currency => {
            conversions[currency.id] = this.convertFromTo(amount, fromCurrency, currency.id);
        });
        
        // Convert to VES references
        CONFIG.CURRENCIES.VES_REFERENCES.forEach(currency => {
            conversions[currency.id] = this.convertFromTo(amount, fromCurrency, currency.id);
        });
        
        // Convert to all cryptocurrencies
        CONFIG.CURRENCIES.CRYPTO.forEach(currency => {
            conversions[currency.id] = this.convertFromTo(amount, fromCurrency, currency.id);
        });
        
        return conversions;
    }

    formatValue(value, currency) {
        if (isNaN(value) || !isFinite(value)) return '0';
        
        // Special formatting for different currency types
        if (currency === 'SAT') {
            return value.toFixed(0);
        } else if (currency === 'BTC' || CONFIG.CURRENCIES.CRYPTO.some(c => c.id === currency)) {
            return value.toFixed(8);
        } else if (currency.startsWith('VES')) {
            return value.toFixed(4);
        } else {
            return value.toFixed(4);
        }
    }
}

// Create global calculator instance
const calculator = new Calculator();