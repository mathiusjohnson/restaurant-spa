//Helper function to calcuate taxes and total price
// const calcTotalSales = function(order) {

// }

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    // const id = req.params.id
    const id = 1;
    db.query(
      `SELECT menu_items.*
                FROM menu_items
                JOIN categories ON category_id = categories.id
                WHERE category_id = $1`, [id]
    )
      .then(data => {
        const entries = data.rows;
        res.json({ entries });
      });
  });
  return router;
};
