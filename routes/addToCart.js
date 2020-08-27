const express = require('express');
const router = express.Router();
module.exports = (db) => {
  router.post('/', (req, res) => {
    console.log('req.body', req.body);
    // const id = req.params.id
    const menuItemId = req.body.menuItemId;
    const orderId = 2;
    const customerId = 2;
    const quantity = req.body.quantity;

    // first we need to check if order_item with the same menu item is already there if true, increment quantity
    // else we want to add to cart

    db.query(`SELECT * FROM order_items where menu_item_id = $1 AND customer_id = $2;`, [menuItemId, customerId])
      .then((result1) => {
        console.log('result1:', result1.rows);
        if (result1.rows.length > 0) {
          const newQuantity = parseInt(result1.rows[0].quantity) + parseInt(req.body.quantity);
          db.query(`UPDATE order_items set quantity = $1 where menu_item_id = $2 AND customer_id= $3;`, [newQuantity, menuItemId, customerId])
            .then((result2) => {
              db.query(`SELECT * FROM order_items`)
                .then((result3) => {
                  const orderItems = result3.rows;
                  res.json(orderItems);
                });
            });
        } else {
          db.query(`INSERT INTO order_items (menu_item_id, order_id, customer_id, quantity) VALUES($1, $2, $3, $4)
            RETURNING *;`, [menuItemId, orderId, customerId, quantity])
            .then(data => {
              db.query(`SELECT * FROM order_items`)
                .then((result3) => {
                  const orderItems = result3.rows;
                  res.json(orderItems);
                });
              // console.log('data', data.rows);
              // const entries = data.rows;
              // res.json({ entries });
            });
        }
      });
  });
  return router;
};
