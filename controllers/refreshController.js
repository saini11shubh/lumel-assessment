// controllers/refreshController.js

const csvLoader = require('../utils/csvLoader');
const logger = require('../utils/logger');

const refreshData = async (req, res) => {
    try {
        await csvLoader(); // your CSV loader logic
        logger.info('Data refresh successful');
        res.status(200).json({ message: 'Data refreshed successfully' });
    } catch (error) {
        logger.error('Data refresh failed:', error);
        res.status(500).json({ error: 'Data refresh failed' });
    }
};

module.exports = { refreshData };
