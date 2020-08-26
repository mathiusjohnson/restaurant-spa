const express = require('express');
const router = express.Router();
module.exports = (db) => {
  router.get('/', (req, res) => {
    // const id = req.params.id
    const orderId = 2;

    db
      .query(
        `SELECT orders.id, menu_items.name, SUM(order_items.quantity) as quantity
        FROM orders
          JOIN order_items ON order_id = orders.id
          JOIN menu_items ON menu_item_id = menu_items.id
        WHERE orders.id = $1
        GROUP BY orders.id, menu_items.name;`, [orderId]
      )
      .then(data => {
        const orders = data.rows;
        res.json({ orders });
      })
      .catch(err => {
        console.log('err', err);
      });

  });
  return router;


};
