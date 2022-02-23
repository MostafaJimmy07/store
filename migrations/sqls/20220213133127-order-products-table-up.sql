/* Replace with your SQL commands */
CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  quantity integer,
  order_id BIGINT REFERENCES orders(id) NOT NULL,
  product_id BIGINT REFERENCES products(id) NOT NULL
);