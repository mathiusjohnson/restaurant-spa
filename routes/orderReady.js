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
  router.post('/', (req, res) => {

    console.log("req: ", req);
    const id = 2;
    db.query(
      `SELECT menu_items.name, price, customers.name, customers.phone_number
      FROM menu_items
      JOIN order_items ON menu_item_id = menu_items.id
      JOIN customers ON customers.id = customer_id
      WHERE customer_id = $1;`, [id])
      .then(data => {
        client.messages
          .create({
            body: "Your order is ready!",
            from: '+14132254219',
            to: '+12368388913'
          })
          .then(message => console.log(message.sid));
        // console.log("this is data: " ,data);
        // const order = data.rows;
        // res.json({ order });
      });
  });
  return router;
};
//   const { name, phone } = req.body;
//   const user = {
//     name,
//     phone
//   };
//   userDatabase.push(user);
//   const welcomeMessage = 'hello, this is Caia testing';
//   sendSms(user.phone, welcomeMessage);
//   res.status(201).send({
//     message: 'Account created successfully, kindly check your phone to activate your account!',
//     data: user
//   });
// });
// router.listen(port, () => {
//   console.log(`Server running on port ${port}`);
