const Order = require('../models/Order');

exports.topProducts = async (req, res) => {
    const { start, end, limit = 5 } = req.query;

    try {
        const result = await Order.aggregate([
            {
                $match: {
                    dateOfSale: { $gte: new Date(start), $lte: new Date(end) }
                }
            },
            {
                $group: {
                    _id: "$productId",
                    totalQuantity: { $sum: "$quantitySold" }
                }
            },
            { $sort: { totalQuantity: -1 } },
            { $limit: parseInt(limit) }
        ]);

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Top product analysis failed', details: err.message });
    }
};
