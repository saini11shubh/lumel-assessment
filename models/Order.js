const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: { type: String, unique: true },
    productId: String,
    customerId: String,
    dateOfSale: Date,
    quantitySold: Number,
    unitPrice: Number,
    discount: Number,
    shippingCost: Number,
    paymentMethod: String
});

module.exports = mongoose.model('Order', orderSchema);
