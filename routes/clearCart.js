const express = require('express');
const router = express.Router();
module.exports = (db) => {
  router.post('/', (req, res) => {
    console.log("inside clearCart.js");
    db.query('DELETE FROM order_items WHERE id > 1;')
      .then(data => {
        const entries = data.rows;
        res.json({ entries });
      });
  });
  return router;
};
