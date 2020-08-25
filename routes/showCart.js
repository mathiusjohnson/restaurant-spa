const express = require('express');
const router = express.Router();
module.exports = (db) => {
    router.get('/', (req, res) => {
        // const id = req.params.id
        const customerId = 1;

        db
            .query(
                `SELECT menu_items.*
                FROM menu_items
                  JOIN order_items ON menu_item_id = menu_items.id
                  JOIN customers ON customers.id = customer_id
                WHERE customer_id = $1;`, [customerId]
            )
            .then(data => {
                console.log('data', data.rows);
                const orderCart = data.rows;
                res.json({ orderCart });
            });
    });
    return router;
};
