-- for menu items by category
SELECT menu_items.*, categories.name
FROM menu_items
  JOIN categories ON category_id = categories.id
WHERE category_id = 1;

-- for orders
SELECT menu_items.name, price
FROM menu_items
  JOIN order_items ON menu_item_id = menu_items.id
WHERE order_id = 1;

-- for customer specific orders
SELECT customers.name, menu_items.name, price
FROM customers
  JOIN orders ON customer_id = customers.id
  JOIN order_items ON order_id = orders.id
  JOIN menu_items ON menu_item_id = menu_items.id
WHERE customers.id = 1;

-- total price
SELECT SUM(price)
FROM menu_items
  JOIN order_items ON menu_item_id = menu_items.id
WHERE order_id = 1
GROUP BY order_id;

-- subtotal
SELECT SUM(price)
FROM menu_items
  JOIN order_items ON menu_item_id = menu_items.id
WHERE order_id = 1
GROUP BY menu_items.name;


-- functions
place ORDER
INSERT INTO


-- for add to order button
add items
(name, price and quantity) to cart




-- For the side nav buttons
find items by category
SELECT menu_items.*, categories.name
FROM menu_items
  JOIN categories ON category_id = categories.id
WHERE category_id = 1;



--menu
queryString = SELECT menu_items.*, categories.name
FROM menu_items
  JOIN categories ON category_id = categories.id
WHERE category_id = 1;

return db.query(queryString, queryParams)
    .then(res => res.rows);
