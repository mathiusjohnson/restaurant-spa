const express = require('express');
const router = express.Router();
module.exports = (db) => {
    router.get('/', (req, res) => {
        // const id = req.params.id
        const customerId = 2;

        db
            .query(
                `SELECT * FROM menu_items, order_items
                WHERE order_items.menu_item_id=menu_items.id
                AND order_items.customer_id=$1
                AND order_id=2;`, [customerId]
            )
            .then(data => {
                console.log('data', data.rows);
                const orderCart = data.rows;
                res.json({ orderCart })
            })
            .catch(err => {
                console.log('err', err);
            });

    });
    return router;
};
