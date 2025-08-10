// UI management service
class UIManager {
    constructor() {
        this.inputs = new Map();
        this.isUpdating = false;
    }

    initialize() {
        this.createTables();
        this.attachEventListeners();
    }

    createTables() {
        this.createFiatTable();
        this.createCryptoTable();
    }

    createFiatTable() {
        const tbody = document.getElementById('fiat-currencies');
        tbody.innerHTML = '';

        // Add regular fiat currencies
        CONFIG.CURRENCIES.FIAT.forEach(currency => {
            const row = this.createCurrencyRow(currency);
            tbody.appendChild(row);
        });

        // Add VES references
        CONFIG.CURRENCIES.VES_REFERENCES.forEach(currency => {
            const row = this.createVESReferenceRow(currency);
            tbody.appendChild(row);
        });
    }

    createCryptoTable() {
        const tbody = document.getElementById('cryptocurrencies');
        tbody.innerHTML = '';

        CONFIG.CURRENCIES.CRYPTO.forEach(currency => {
            const row = this.createCryptoRow(currency);
            tbody.appendChild(row);
        });
    }

    createCurrencyRow(currency) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <span class="flag">${currency.flag}</span>
            </td>
            <td>
                <span class="currency-symbol">${currency.symbol} ${currency.id}</span>
            </td>
            <td>
                <input type="number" 
                       id="${currency.id}" 
                       class="currency-input" 
                       step="any" 
                       placeholder="0.00">
            </td>
        `;
        return row;
    }

    createVESReferenceRow(currency) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <span class="flag">${currency.flag}</span>
            </td>
            <td>
                <span class="currency-symbol">${currency.symbol}</span>
                <br>
                <a href="${currency.reference.url}" 
                   class="reference-link" 
                   target="_blank" 
                   rel="noopener">
                    Ref ${currency.reference.name}
                </a>
            </td>
            <td>
                <input type="number" 
                       id="${currency.id}" 
                       class="currency-input" 
                       step="any" 
                       placeholder="0.00">
            </td>
        `;
        return row;
    }

    createCryptoRow(currency) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <span class="currency-symbol">${currency.symbol} ${currency.id}</span>
            </td>
            <td>
                <input type="number" 
                       id="${currency.id}" 
                       class="currency-input" 
                       step="any" 
                       placeholder="0.00">
            </td>
        `;
        return row;
    }

    attachEventListeners() {
        // Get all currency inputs
        const allCurrencies = [
            ...CONFIG.CURRENCIES.FIAT,
            ...CONFIG.CURRENCIES.VES_REFERENCES,
            ...CONFIG.CURRENCIES.CRYPTO
        ];

        allCurrencies.forEach(currency => {
            const input = document.getElementById(currency.id);
            if (input) {
                this.inputs.set(currency.id, input);
                input.addEventListener('input', (e) => this.handleInputChange(e, currency.id));
                input.addEventListener('focus', (e) => e.target.select());
            }
        });
    }

    handleInputChange(event, currencyId) {
        if (this.isUpdating) return;

        const value = parseFloat(event.target.value) || 0;
        if (value === 0) {
            this.clearAllInputs();
            return;
        }

        this.updateAllInputs(value, currencyId);
    }

    updateAllInputs(amount, fromCurrency) {
        this.isUpdating = true;

        try {
            const conversions = calculator.getAllConversions(amount, fromCurrency);

            this.inputs.forEach((input, currencyId) => {
                if (currencyId === fromCurrency) return;

                const convertedValue = conversions[currencyId];
                if (convertedValue !== undefined) {
                    const formattedValue = calculator.formatValue(convertedValue, currencyId);
                    input.value = formattedValue;
                }
            });
        } catch (error) {
            console.error('Error updating inputs:', error);
        } finally {
            this.isUpdating = false;
        }
    }

    clearAllInputs() {
        this.isUpdating = true;
        this.inputs.forEach(input => {
            input.value = '';
        });
        this.isUpdating = false;
    }

    updatePriceDisplay(prices) {
        const elements = {
            GETUSD: prices.USD,
            GETEUR: prices.EUR,
            GETVESAT: prices.VESCMC ? (prices.VESCMC / CONFIG.CONSTANTS.SATOSHI_PER_BTC).toFixed(4) : 'N/A',
            GETSATVES: prices.VESCMC ? (CONFIG.CONSTANTS.SATOSHI_PER_BTC / prices.VESCMC).toFixed(4) : 'N/A',
            REFUSDSAT: prices.USD ? ((1 / prices.USD) * CONFIG.CONSTANTS.SATOSHI_PER_BTC).toFixed(2) : 'N/A'
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = typeof value === 'number' ? value.toFixed(2) : value;
                element.classList.remove('loading');
            }
        });
    }

    setDemoValues() {
        // Set 1 SAT as demo value
        const satInput = this.inputs.get('SAT');
        if (satInput) {
            satInput.value = '1';
            this.handleInputChange({ target: satInput }, 'SAT');
        }
    }
}

// Create global UI manager instance
const uiManager = new UIManager();