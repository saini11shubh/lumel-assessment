const Order = require('../models/Order');

exports.calculateRevenue = async (req, res) => {
    const { start, end } = req.query;
    try {
        const revenue = await Order.aggregate([
            {
                $match: {
                    dateOfSale: { $gte: new Date(start), $lte: new Date(end) }
                }
            },
            {
                $project: {
                    revenue: {
                        $multiply: [
                            "$quantitySold",
                            { $multiply: ["$unitPrice", { $subtract: [1, "$discount"] }] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$revenue" }
                }
            }
        ]);
        res.json({ totalRevenue: revenue[0]?.totalRevenue || 0 });
    } catch (err) {
        res.status(500).json({ error: 'Revenue calc failed', details: err.message });
    }
};
