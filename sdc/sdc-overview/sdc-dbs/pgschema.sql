--psql -f pgschema.sql -p 5432


DROP DATABASE IF EXISTS sdc;
CREATE DATABASE sdc;
\c sdc
DROP SCHEMA IF EXISTS products CASCADE;
CREATE SCHEMA products;
CREATE TABLE sdc.products.product (
  id SERIAL,
  product_id INT,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price TEXT,
  PRIMARY KEY (id),
  UNIQUE (product_id)
);


CREATE TABLE sdc.products.styles (
  id SERIAL,
  styles_id INT,
  product_id INT,
  name VARCHAR (50),
  sale_price VARCHAR (11),
  original_price VARCHAR (11),
  style_default BOOLEAN,
  photos TEXT,
  skus_id INT,
  PRIMARY KEY (id),
  UNIQUE (styles_id),
  CONSTRAINT fk_products
    FOREIGN KEY (product_id)
    REFERENCES sdc.products.product(product_id)
);

CREATE TABLE sdc.products.skus (
  id SERIAL,
  skus_id INT,
  styles_id INT,
  size TEXT,
  quantity INT,
  PRIMARY KEY (id),
  UNIQUE (skus_id),
  CONSTRAINT fk_styles
    FOREIGN KEY (styles_id)
    REFERENCES sdc.products.styles(styles_id)
);