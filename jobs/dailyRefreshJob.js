const cron = require('node-cron');
const loadData = require('../utils/csvLoader');
const logger = require('../utils/logger');

// Run at midnight daily
cron.schedule('0 0 * * *', async () => {
    try {
        logger.info(' Running daily data refresh...');
        await loadData(true);
        logger.info(' Daily data refresh complete');
    } catch (err) {
        logger.error(' Daily data refresh failed', err);
    }
});
