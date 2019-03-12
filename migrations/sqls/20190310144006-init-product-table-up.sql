CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
COMMIT;

CREATE TABLE products
(
  id                    uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_name          VARCHAR(255)    NOT NULL,
  title                 VARCHAR(255)    NOT NULL,
  description           VARCHAR(255)    NOT NULL,
  is_in_stock           BOOLEAN         NOT NULL,
  made_of               TEXT,
  manufacturing_process TEXT,
  created_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at            TIMESTAMP WITH TIME ZONE,
  created_by            UUID CONSTRAINT user_id_fkey REFERENCES users NOT NULL,
  category_id           UUID CONSTRAINT category_id_fkey REFERENCES product_categories NOT NULL
);