const axios = require('axios');
const CryptoData = require('../models/CryptoData');

const fetchCryptoData = async () => {
    try {
        const coins = ['bitcoin', 'ethereum', 'matic-network'];
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
        );

        for (const coin of coins) {
            const { usd: price, usd_market_cap: marketCap, usd_24h_change: change24h } = response.data[coin];

            const cryptoData = new CryptoData({
                name: coin, // Add the cryptocurrency name
                price,
                marketCap,
                change24h,
            });

            await cryptoData.save();
            console.log(`Data saved for ${coin}`);
        }
    } catch (error) {
        console.error('Error fetching or saving data:', error.message);
    }
};

module.exports = fetchCryptoData;