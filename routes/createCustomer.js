const express = require('express');
const router = express.Router();
module.exports = (db) => {
  router.get('/', (req, res) => {
    // const id = req.params.id
    const customerId = 2;

    db
      .query(
        `SELECT customers.name, customers.phone_number, orders.id
        FROM customers
          JOIN orders ON customers.id = customer_id
        WHERE customers.id = $1;`, [customerId]
      )
      .then(data => {
        const customer = data.rows;
        res.json({ customer });
      })
      .catch(err => {
        console.log('err', err);
      });

  });
  return router;


};
