const express = require('express');
const router = express.Router();
module.exports = (db) => {
    router.post('/', (req, res) => {
        console.log('req.body', req.body);
        // const id = req.params.id
        const menuItemId = 1;
        const orderId = 2;
        const customerId = 2;
        const quantity = 4;
        db
            .query(
                `INSERT INTO order_items
              (menu_item_id, order_id, customer_id, quantity)
            VALUES
              ($1, $2, $3, $4)
              RETURNING *;`, [menuItemId, orderId, customerId, quantity]
            )
            .then(data => {
                console.log('data', data.rows);
                const entries = data.rows;
                res.json({ entries });
            });
    });
    return router;
};
