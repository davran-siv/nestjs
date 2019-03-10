CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
COMMIT;

CREATE TABLE users
(
  id         uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  first_name  VARCHAR(255)                              NOT NULL,
  last_name   VARCHAR(255)                              NOT NULL,
  middle_name VARCHAR(255),
  username    VARCHAR(255) UNIQUE,
  password    VARCHAR(255)                              NOT NULL,
  is_deleted  BOOLEAN                                            DEFAULT FALSE,
  is_active   BOOLEAN                                            DEFAULT TRUE,
  created_at  TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at  TIMESTAMP WITHOUT TIME ZONE,
  photo VARCHAR,
  email_address VARCHAR(50) UNIQUE NOT NULL,
  is_email_verified BOOLEAN DEFAULT FALSE,
  country_code VARCHAR(5),
  phone_number VARCHAR(20),
  is_phone_verified BOOLEAN DEFAULT FALSE,
  birth_date DATE NOT NULL
);