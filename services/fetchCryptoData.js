const axios = require('axios');
const CryptoData = require('../models/CryptoData');

// Function to fetch and save cryptocurrency data
const fetchCryptoData = async () => {
    try {
        // List of cryptocurrency IDs to fetch data for
        const coins = ['bitcoin', 'ethereum', 'matic-network'];

        // Fetch data from the CoinGecko API
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
        );

        // Loop through each coin and save its data to MongoDB
        for (const coin of coins) {
            const { usd: price, usd_market_cap: marketCap, usd_24h_change: change24h } = response.data[coin];

            // Create a new document for the cryptocurrency data
            const cryptoData = new CryptoData({
                name: coin,
                price,
                marketCap,
                change24h,
            });

            // Save the document to the database
            await cryptoData.save();
            console.log(`Data saved for ${coin}`);
        }
    } catch (error) {
        console.error('Error fetching or saving data:', error.message);
    }
};

// Export the function
module.exports = fetchCryptoData;