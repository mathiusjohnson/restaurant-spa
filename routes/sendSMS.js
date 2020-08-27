const express = require('express');
const bodyParser = require('body-parser');
// const sendSms = require('./twilio');
const router = express.Router();
const accountSid = 'ACb293030513abf9a16262c01ff0ef494e';
const authToken = '4af8f2918eafa75e5966d253b9686083';
const client = require('twilio')(accountSid, authToken);
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// const port = 3000;
// const userDatabase = [];
// Create users endpoint
module.exports = (db) => {
  router.post('/send', (req, res) => {
    console.log("req body: ", req.body);
    const id = 2;
    db.query(
      `SELECT menu_items.name as menu_item, customers.name, customers.phone_number, order_items.quantity
      FROM menu_items
      JOIN order_items ON menu_item_id = menu_items.id
      JOIN customers ON customers.id = customer_id
      WHERE customer_id = $1;`, [id])
      .then(data => {
        console.log(data.rows);
        const order = data.rows[0];
        const customer = order.name;
        const phone = order.phone_number;
        let itemAndQuantity = [];
        for (const rows of data.rows) {
          itemAndQuantity.push(` ${rows.quantity} ${rows.menu_item}`);
        }
        client.messages
          .create({
            body: `A new order has been placed! ${customer} ordered: ${itemAndQuantity}. Contact details: ${phone}.`,
            from: '+14132254219',
            to: '+12368388913'
          })
          .then(message => console.log(message.sid));
      });
  });
  return router;
};
