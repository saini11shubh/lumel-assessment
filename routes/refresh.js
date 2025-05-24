const express = require('express');
const router = express.Router();
const refreshController = require('../controllers/refreshController');

router.post('/', refreshController.refreshData);

module.exports = router;
