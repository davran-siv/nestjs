CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
COMMIT;

CREATE TABLE product_categories
(
  id                    uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  category_name         VARCHAR(100),
  is_active             BOOLEAN DEFAULT TRUE NOT NULL,
  parent_category_id    UUID CONSTRAINT category_id_fkey REFERENCES product_categories
);