const cron = require('node-cron');
const fetchCryptoData = require('../services/fetchCryptoData');

// Schedule the job to run every 2 hours
cron.schedule('0 */2 * * *', () => {
    console.log('Running the crypto data fetch job...');
    fetchCryptoData();
});
// cron.schedule('* * * * *', () => { // Runs every 10 minutes
//     console.log('Running the crypto data fetch job...');
//     fetchCryptoData();
// });
// https://crontab.guru/