require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const connectDB = require('./db');
const cronJob = require('./jobs/cronJob');

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});