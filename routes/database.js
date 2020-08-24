const db = require('./db/index.js');


const addToCart = (order) => {
  const queryString = (`INSERT INTO order_items
  (menu_item_id, order_id, customer_id, quantity)
VALUES
  ($1, $2, $3, $4);`, [order.menu_item_id, order.order_id, order.customer_id, order.quantity]);

  return db.query(queryString)
    .then(res => res.rows);
};
exports.addToCart = addToCart;

const totalPrice = (id) => {
  const queryString = (`
  SELECT (SUM(price)/100)
  FROM menu_items
    JOIN order_items ON menu_item_id = menu_items.id
  WHERE order_id = $1
  GROUP BY order_id;`, [id]);
  return db.query(queryString)
    .then(res => res.rows);
};
exports.totalPrice = totalPrice;

const placeOrder = (id) => {
  const queryString = (`
  INSERT INTO orders
    (id, customer_id, order_date)
  VALUES
    ($1, $2, $3);`, [id]);
  return db.query(queryString)
    .then(res => res.rows);
};
exports.placeOrder = placeOrder;

const gstCalc = (id) => {
  const queryString = (`SELECT ROUND(((SUM(price)*.05)/100), 2)
  FROM menu_items
    JOIN order_items ON menu_item_id = menu_items.id
  WHERE order_id = $1
  GROUP BY menu_items.name;`, [id]);
  return db.query(queryString)
    .then(res => res.rows);
};
exports.gstCalc = gstCalc;

const pstCalc = (id) => {
  const queryString = (`SELECT ROUND(((SUM(price)*.07)/100), 2)
  FROM menu_items
    JOIN order_items ON menu_item_id = menu_items.id
  WHERE order_id = $1
  GROUP BY menu_items.name;`, [id]);
  return db.query(queryString)
    .then(res => res.rows);
};
exports.gstCalc = pstCalc;
