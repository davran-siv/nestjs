CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
COMMIT;

CREATE TABLE users_favorite_products
(
  user_id       UUID CONSTRAINT user_id_fkey REFERENCES users NOT NULL,
  product_id    UUID CONSTRAINT product_id_fkey REFERENCES products NOT NULL
);