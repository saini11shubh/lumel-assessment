const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.get('/revenue', salesController.calculateRevenue);

module.exports = router;
