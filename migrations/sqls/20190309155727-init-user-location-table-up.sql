CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
COMMIT;

CREATE TABLE "user_locations"
(
  user_id      UUID CONSTRAINT user_id_fkey REFERENCES users NOT NULL,
  country  VARCHAR(255) NOT NULL,
  city   VARCHAR(255)            NOT NULL,
  state VARCHAR(255) NOT NULL,
  zip_code    VARCHAR(255) NOT NULL,
  street    VARCHAR(255)                              NOT NULL
);