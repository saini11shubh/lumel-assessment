const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGODB_URI;

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
}

module.exports = connectDB;
