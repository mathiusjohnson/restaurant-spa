const express = require('express');
const router = express.Router();
module.exports = (db) => {
  router.post('/', (req, res) => {
    const menuItemId = req.body.menuItemId;
    const orderId = 2;
    const customerId = 2;
    const quantity = req.body.quantity;
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

