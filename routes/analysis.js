const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');

router.get('/top-products', analysisController.topProducts);

module.exports = router;
