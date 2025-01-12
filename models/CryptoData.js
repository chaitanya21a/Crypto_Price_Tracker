const mongoose = require('mongoose');

// Define the schema for the cryptocurrency data
const cryptoSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the cryptocurrency (e.g., Bitcoin)
    price: { type: Number, required: true }, // Current price in USD
    marketCap: { type: Number, required: true }, // Market cap in USD
    change24h: { type: Number, required: true }, // 24-hour price change
    timestamp: { type: Date, default: Date.now }, // Timestamp of when the data was fetched
});

// Create a model from the schema
const CryptoData = mongoose.model('CryptoData', cryptoSchema);

// Export the model
module.exports = CryptoData;