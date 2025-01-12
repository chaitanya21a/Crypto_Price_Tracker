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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});