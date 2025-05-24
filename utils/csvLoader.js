const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const Product = require('../models/Product');
const Customer = require('../models/Customer');
const Order = require('../models/Order');
const logger = require('./logger');

const csvFilePath = path.join(__dirname, '..', 'data', 'sales.csv');

const loadData = async (refresh = false) => {
    return new Promise((resolve, reject) => {
        const orders = [];

        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row) => {
                try {
                    orders.push({
                        orderId: row['Order ID'],
                        productId: row['Product ID'],
                        customerId: row['Customer ID'],
                        dateOfSale: new Date(row['Date of Sale']),
                        quantitySold: Number(row['Quantity Sold']),
                        unitPrice: Number(row['Unit Price']),
                        discount: Number(row['Discount']),
                        shippingCost: Number(row['Shipping Cost']),
                        paymentMethod: row['Payment Method']
                    });

                    Product.updateOne(
                        { productId: row['Product ID'] },
                        {
                            productId: row['Product ID'],
                            name: row['Product Name'],
                            category: row['Category']
                        },
                        { upsert: true }
                    ).exec();

                    Customer.updateOne(
                        { customerId: row['Customer ID'] },
                        {
                            customerId: row['Customer ID'],
                            name: row['Customer Name'],
                            email: row['Customer Email'],
                            address: row['Customer Address']
                        },
                        { upsert: true }
                    ).exec();
                } catch (err) {
                    logger.error(` Failed to parse row: ${JSON.stringify(row)}`);
                }
            })
            .on('end', async () => {
                try {
                    if (refresh) {
                        await Order.deleteMany({});
                    }
                    await Order.insertMany(orders);
                    logger.info('CSV data successfully loaded');
                    resolve();
                } catch (err) {
                    logger.error(' Error inserting orders', err);
                    reject(err);
                }
            })
            .on('error', reject);
    });
};

module.exports = loadData;
