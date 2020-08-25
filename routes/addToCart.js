const express = require('express');
const router  = express.Router();

module.exports = (db) => {
    router.post('/', (req, res) => {
        // const id = req.params.id
        const menuItemId = 1;
        const orderId = 1;
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
                const entries = data.rows;
                res.json({ entries });
            });
    });
    return router;
};

// POST REQUEST - addToCart
// router.post('/cart', (req, res) => {
//   const customer_id = req.session.customer_id;
//   database.addToCart({...req.body, customer_id })
//     .then(order_items => {
//       res.send(order_items);
//     })
//     .catch(e => {
//       console.error(e);
//       res.send(e);
//     });
// });
