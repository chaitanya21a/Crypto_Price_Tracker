# Crypto Price Tracker

![Node.js](https://img.shields.io/badge/Node.js-14.x-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![Railway](https://img.shields.io/badge/Deployed%20on-Railway-blue)

A backend application that fetches and stores cryptocurrency data (Bitcoin, Ethereum, and Matic) using the CoinGecko API. It provides APIs to retrieve the latest price, market cap, 24-hour change, and the standard deviation of prices for the last 100 records.

**Deployed URL**: [https://cryptopricetracker-production.up.railway.app/](https://cryptopricetracker-production.up.railway.app/)  
**GitHub Repository**: [https://github.com/chaitanya21a/Crypto_Price_Tracker](https://github.com/chaitanya21a/Crypto_Price_Tracker)

---

## Features
- Fetches cryptocurrency data (price, market cap, 24-hour change) every 2 hours.
- Stores data in MongoDB.
- APIs:
  - **`/stats`**: Latest price, market cap, and 24-hour change.
  - **`/deviation`**: Standard deviation of prices for the last 100 records.
- Supported cryptocurrencies: Bitcoin, Ethereum, Matic.

---

## Technologies
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **API**: CoinGecko API
- **Deployment**: Railway
- **Scheduling**: `node-cron`

---

## How to Access and Use the API

### Base URL
The API is hosted at: [https://cryptopricetracker-production.up.railway.app/](https://cryptopricetracker-production.up.railway.app/) 

## API Endpoints

### 1. Get Latest Stats
- **Endpoint**: `/stats`
- **Method**: `GET`
- **Query Parameter**: `coin` (e.g., `bitcoin`, `ethereum`, `matic-network`)
- **Example Request**:
  ```bash
  GET https://cryptopricetracker-production.up.railway.app/stats?coin=bitcoin
- **Example Response**:
```json
{
  "price": 40000,
  "marketCap": 800000000000,
  "24hChange": 1.5
}
```
### 2.Get Price Deviation
- **Endpoint**: `/deviation`
- **Method**: `GET`
- **Query Parameter**: `coin` (e.g., `bitcoin`, `ethereum`, `matic-network`)

- **Example Request**:
  ```bash
  GET https://cryptopricetracker-production.up.railway.app/deviation?coin=bitcoin
- **Example Response**:
  ```json
  {
    "deviation": 4082.48
  }
  ```
## Local Setup

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB Atlas** account (for database)
- **CoinGecko API** (no API key required)

### Steps to Set Up Locally
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/chaitanya21a/Crypto_Price_Tracker.git
   cd Crypto_Price_Tracker
2. **Install Dependencies**:
   ```bash
   npm install
3. **Set Up Environment Variables**:
   Create a .env file in the root directory.
   Add the following variables: .env
   `MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority`
   `PORT=3000`
   Replace `<username>`, `<password>`, and `<dbname>` with your MongoDB Atlas credentials.
4. **Run the Application**:

    ```bash
    npm start
   
The app will start on `http://localhost:3000`.

***Test the API***:
Open your browser or use a tool like Postman.

Access the following endpoints:
1. Get Latest Stats:
   ```bash
   http://localhost:3000/stats?coin=bitcoin
2. Get Price Deviation:
   ```bash
   http://localhost:3000/deviation?coin=bitcoin
   
Notes:
1. Ensure your MongoDB Atlas cluster is accessible:
2. Whitelist your IP address in MongoDB Atlas.
3. Verify the connection string in .env.
   
If the app crashes:
1. Check the logs for errors.
2. Ensure all dependencies are installed.

