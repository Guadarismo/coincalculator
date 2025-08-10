// Configuration constants
const CONFIG = {
    API: {
        COINMARKETCAP_BASE: 'https://3rdparty-apis.coinmarketcap.com/v1/cryptocurrency/widget',
        UPDATE_INTERVAL: 60000, // 1 minute
        SUMMARY_UPDATE_INTERVAL: 62000 // 1 minute 2 seconds
    },
    
    CURRENCIES: {
        FIAT: [
            { id: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳', symbol: '¥', cmcId: '2787' },
            { id: 'USD', name: 'US Dollar', flag: '🇺🇸', symbol: '$', cmcId: '2781' },
            { id: 'EUR', name: 'Euro', flag: '🇪🇺', symbol: '€', cmcId: '2790' },
            { id: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦', symbol: 'CAD', cmcId: '2784' },
            { id: 'BRL', name: 'Brazilian Real', flag: '🇧🇷', symbol: 'BRL', cmcId: '2783' },
            { id: 'COP', name: 'Colombian Peso', flag: '🇨🇴', symbol: 'COP', cmcId: '2820' },
            { id: 'ARS', name: 'Argentine Peso', flag: '🇦🇷', symbol: 'ARS', cmcId: '2821' },
            { id: 'CLP', name: 'Chilean Peso', flag: '🇨🇱', symbol: 'CLP', cmcId: '2786' }
        ],
        
        VES_REFERENCES: [
            { 
                id: 'VESCMC', 
                name: 'VES Ref CMC', 
                flag: '🇻🇪', 
                symbol: 'VES', 
                cmcId: '3573',
                reference: { name: 'CMC', url: 'https://coinmarketcap.com/converter/' }
            },
            { 
                id: 'VESMNTDOLVZLA', 
                name: 'VES Ref Monitor Dolar Venezuela', 
                flag: '🇻🇪', 
                symbol: 'VES',
                reference: { name: 'Monitor Dolar Venezuela', url: 'https://monitordolarvenezuela.com/' }
            },
            { 
                id: 'VESBITVEN', 
                name: 'VES Ref BITVEN', 
                flag: '🇻🇪', 
                symbol: 'VES',
                reference: { name: 'BITVEN', url: 'https://www.bitven.com/' }
            },
            { 
                id: 'VESDOLTODAY', 
                name: 'VES Ref DolToday', 
                flag: '🇻🇪', 
                symbol: 'VES',
                reference: { name: 'DolToday', url: 'https://dolartoday.com/' }
            },
            { 
                id: 'VESDOLTODAYBTC', 
                name: 'VES Ref DolToday BTC', 
                flag: '🇻🇪', 
                symbol: 'VES',
                reference: { name: 'DolToday', url: 'https://dolartoday.com/' }
            },
            { 
                id: 'VESDOLTODAYLOCBTC', 
                name: 'VES Ref DolToday Local Bitcoins', 
                flag: '🇻🇪', 
                symbol: 'VES',
                reference: { name: 'DolToday', url: 'https://dolartoday.com/' }
            }
        ],
        
        CRYPTO: [
            { id: 'BTC', name: 'Bitcoin', symbol: '₿', cmcId: '1' },
            { id: 'SAT', name: 'Satoshi', symbol: 'SAT', cmcId: '1' },
            { id: 'ETH', name: 'Ethereum', symbol: 'ETH', cmcId: '1027' },
            { id: 'DOGE', name: 'Dogecoin', symbol: 'DOGE', cmcId: '74' },
            { id: 'LTC', name: 'Litecoin', symbol: 'LTC', cmcId: '2' },
            { id: 'ADA', name: 'Cardano', symbol: 'ADA', cmcId: '2010' },
            { id: 'XMR', name: 'Monero', symbol: 'XMR', cmcId: '328' },
            { id: 'DASH', name: 'Dash', symbol: 'DASH', cmcId: '131' },
            { id: 'BAT', name: 'Basic Attention Token', symbol: 'BAT', cmcId: '1697' },
            { id: 'PIVX', name: 'PIVX', symbol: 'PIVX', cmcId: '1169' },
            { id: 'STEEM', name: 'Steem', symbol: 'STEEM', cmcId: '1230' },
            { id: 'BTT', name: 'BitTorrent', symbol: 'BTT', cmcId: '3718' },
            { id: 'FIL', name: 'Filecoin', symbol: 'FIL', cmcId: '2280' },
            { id: 'LBC', name: 'LBRY Credits', symbol: 'LBC', cmcId: '1298' },
            { id: 'YFI', name: 'yearn.finance', symbol: 'YFI', cmcId: '5864' },
            { id: 'TRX', name: 'TRON', symbol: 'TRX', cmcId: '1958' },
            { id: 'BOLI', name: 'Bolivarcoin', symbol: 'BOLI', cmcId: '1053' },
            { id: 'AREPA', name: 'Arepacoin', symbol: 'AREPA', cmcId: '3133' }
        ]
    },
    
    CONSTANTS: {
        SATOSHI_PER_BTC: 100000000
    }
};