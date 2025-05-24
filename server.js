require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const logger = require('./utils/logger');

// Route imports
const salesRoutes = require('./routes/sales');
const refreshRoutes = require('./routes/refresh');
const analysisRoutes = require('./routes/analysis');

// App setup
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send(' API is running'));
app.use('/api/sales', salesRoutes);
app.use('/api/refresh', refreshRoutes);
app.use('/api/analysis', analysisRoutes);

// DB connection
const connectDB = require("./utils/dbConnection")
connectDB()

app.listen(PORT, () => {
    console.log(` Server listening on port ${PORT}`)
})