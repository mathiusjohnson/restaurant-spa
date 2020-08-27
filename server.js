// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 3000;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //used to get data from an object
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const menu = require("./routes/menu");
const addToCart = require("./routes/addToCart");
const showCart = require("./routes/showCart");
const showCartPost = require("./routes/showCartPost");
const sendSMS = require("./routes/sendSMS");
const createOrders = require("./routes/createOrders");
const createCustomer = require('./routes/createCustomer');
const orderReady = require('./routes/orderReady');
// const placeOrder = require('./routes/placeOrder');
const clearCart = require("./routes/clearCart");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/menu", menu(db));
app.use("/api/addToCart", addToCart(db));
app.use("/api/showCart", showCart(db));
app.use("/api/showCartPost", showCartPost(db));
app.use("/api/sms", sendSMS(db));
app.use("/api/orderReady", orderReady(db));
app.use("/api/createOrders", createOrders(db));
app.use("/api/createCustomer", createCustomer(db));

app.use("/api/clearCart", clearCart(db));

// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
