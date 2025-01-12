require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const connectDB = require('./db');
const cronJob = require('./jobs/cronJob');
const CryptoData = require('./models/CryptoData'); // Import the CryptoData model

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// /stats endpoint
app.get('/stats', async (req, res) => {
    try {
        const { coin } = req.query; // Get the coin from query params

        // Validate the coin parameter
        if (!coin || !['bitcoin', 'ethereum', 'matic-network'].includes(coin)) {
            return res.status(400).json({ error: 'Invalid coin parameter. Use bitcoin, ethereum, or matic-network.' });
        }

        // Find the latest data for the requested coin
        const latestData = await CryptoData.findOne({ name: coin }).sort({ timestamp: -1 });

        if (!latestData) {
            return res.status(404).json({ error: 'No data found for the requested coin.' });
        }

        // Send the response
        res.status(200).json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            "24hChange": latestData.change24h,
        });
    } catch (error) {
        console.error('Error fetching stats:', error.message);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

// /deviation endpoint
app.get('/deviation', async (req, res) => {
    try {
        const { coin } = req.query; // Get the coin from query params

        // Validate the coin parameter
        if (!coin || !['bitcoin', 'ethereum', 'matic-network'].includes(coin)) {
            return res.status(400).json({ error: 'Invalid coin parameter. Use bitcoin, ethereum, or matic-network.' });
        }

        // Fetch the last 100 records for the requested coin
        const records = await CryptoData.find({ name: coin })
            .sort({ timestamp: -1 }) // Sort by timestamp in descending order
            .limit(100); // Limit to 100 records

        if (records.length === 0) {
            return res.status(404).json({ error: 'No data found for the requested coin.' });
        }

        // Extract prices from the records
        const prices = records.map(record => record.price);

        // Calculate the mean (average) price
        const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;

        // Calculate the variance
        const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;

        // Calculate the standard deviation
        const deviation = Math.sqrt(variance);

        // Send the response
        res.status(200).json({
            deviation: deviation.toFixed(2), // Round to 2 decimal places
        });
    } catch (error) {
        console.error('Error calculating deviation:', error.message);
        res.status(500).json({ error: 'Failed to calculate deviation' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
