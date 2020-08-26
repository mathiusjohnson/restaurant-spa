-- for menu items by category
SELECT menu_items.*, categories.name
FROM menu_items
  JOIN categories ON category_id = categories.id
WHERE category_id = 1;

-- for orders
SELECT menu_items.name, price
FROM menu_items
  JOIN order_items ON menu_item_id = menu_items.id
  JOIN customers ON customers.id = customer_id
WHERE customer_id = 1;

-- -- for customer specific orders
-- SELECT customers.name, menu_items.name, price
-- FROM customers
--   JOIN orders ON customer_id = customers.id
--   JOIN order_items ON order_id = orders.id
--   JOIN menu_items ON menu_item_id = menu_items.id
-- WHERE customers.id = 1;

-- total price
SELECT SUM(price)
FROM menu_items
  JOIN order_items ON menu_item_id = menu_items.id
WHERE order_id = 1
GROUP BY order_id;

-- GST
SELECT ROUND(((SUM(price)*.05)/100), 2)
FROM menu_items
  JOIN order_items ON menu_item_id = menu_items.id
WHERE order_id = 1
GROUP BY menu_items.name;

-- For the side nav buttons
-- find items by category
SELECT menu_items.*, categories.name
FROM menu_items
  JOIN categories ON category_id = categories.id
WHERE category_id = 1;

--menu items

SELECT menu_items.*, categories.name
FROM menu_items
  JOIN categories ON category_id = categories.id
WHERE category_id = 1;

-- twilio order is ready

SELECT orders.id, menu_items.name, SUM(order_items.quantity), SUM(menu_items.price) as total
FROM orders
  JOIN order_items ON order_id = orders.id
  JOIN menu_items ON menu_item_id = menu_items.id
WHERE orders.id = 2
GROUP BY orders.id, menu_items.name;


SELECT *
FROM menu_items, order_items
WHERE order_items.menu_item_id=menu_items.id
  AND order_id=2
GROUP BY menu_items.name;


SELECT customers.name, customers.phone_number, orders.id
FROM customers
  JOIN orders ON customers.id = customer_id
WHERE customers.id = 2;
