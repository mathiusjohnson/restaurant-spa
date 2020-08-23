-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS preservations CASCADE;
DROP TABLE IF EXISTS property_reviews CASCADE;

CREATE TABLE customers (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  customer_id INTEGER REFERENCES customers(id) NOT NULL,
  order_date DATE NOT NULL
)

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY NOT NULL,
  menu_item_id INTEGER REFERENCES menu_items(id),
  order_id INTEGER REFERENCES orders(id),
  quanity INTEGER
)

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
  -- mains VARCHAR(255) NOT NULL,
  -- sides VARCHAR(255) NOT NULL,
  -- kids_menu VARCHAR(255) NOT NULL,
  -- desserts VARCHAR(255) NOT NULL,
  -- drinks VARCHAR(255) NOT NULL
)

CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  category_id INTEGER REFERENCES categories(id)
)
