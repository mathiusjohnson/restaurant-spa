const express = require('express');
const bodyParser = require('body-parser');
const sendSms = require('./twilio');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const port = 3000;
const userDatabase = [];
// Create users endpoint
module.exports = (db) => {
  router.post('/placeOrder', (req, res) => {
    console.log("req: ", req);
    const id =
    db.query(
      `SELECT menu_items.name, price, customers.name, customers.phone_number
      FROM menu_items
        JOIN order_items ON menu_item_id = menu_items.id
        JOIN customers ON customers.id = customer_id
      WHERE customer_id = $1;`, [id])
      .then(data => {
        const order = data.rows;
        res.json({ order });


    const { name, phone } = req.body;
    const user = {
      name,
      phone
    };
    userDatabase.push(user);
    const welcomeMessage = 'hello, this is Caia testing';
    sendSms(user.phone, welcomeMessage);
    res.status(201).send({
      message: 'Account created successfully, kindly check your phone to activate your account!',
      data: user
    });
  });
  router.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};
