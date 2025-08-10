// Main application controller
class CoinCalculatorApp {
    constructor() {
        this.updateInterval = null;
        this.summaryInterval = null;
    }

    async initialize() {
        try {
            // Initialize UI
            uiManager.initialize();

            // Load initial data
            await this.updatePrices();

            // Set demo values after a short delay
            setTimeout(() => {
                uiManager.setDemoValues();
            }, 2000);

            // Start periodic updates
            this.startPeriodicUpdates();

            console.log('Coin Calculator initialized successfully');
        } catch (error) {
            console.error('Failed to initialize application:', error);
        }
    }

    async updatePrices() {
        try {
            const prices = await apiService.fetchPriceData();
            calculator.updatePrices(prices);
            uiManager.updatePriceDisplay(prices);
        } catch (error) {
            console.error('Failed to update prices:', error);
        }
    }

    startPeriodicUpdates() {
        // Update prices every minute
        this.updateInterval = setInterval(() => {
            this.updatePrices();
        }, CONFIG.API.UPDATE_INTERVAL);

        // Update summary display slightly offset
        this.summaryInterval = setInterval(() => {
            const prices = calculator.prices;
            if (Object.keys(prices).length > 0) {
                uiManager.updatePriceDisplay(prices);
            }
        }, CONFIG.API.SUMMARY_UPDATE_INTERVAL);
    }

    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        if (this.summaryInterval) {
            clearInterval(this.summaryInterval);
        }
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new CoinCalculatorApp();
    app.initialize();

    // Make app globally available for debugging
    window.coinCalculatorApp = app;
});