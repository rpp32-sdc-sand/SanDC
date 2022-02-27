--psql -f pgschema.sql -p 5432


DROP DATABASE IF EXISTS sdc;
CREATE DATABASE sdc;
\c sdc
CREATE SCHEMA products;
CREATE TABLE sdc.products.product (
  pk SERIAL,
  id INT,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price TEXT,
  PRIMARY KEY (pk),
  UNIQUE (id)
);

CREATE TABLE sdc.products.styles (
  pk SERIAL,
  styles_id INT,
  product_id INT,
  name VARCHAR (50),
  sale_price VARCHAR (11),
  original_price VARCHAR (11),
  style_default BOOLEAN,
  PRIMARY KEY (pk),
  UNIQUE (styles_id),
  CONSTRAINT fk_products
    FOREIGN KEY (product_id)
    REFERENCES sdc.products.product(id)
);

CREATE TABLE sdc.products.photos (
  pk SERIAL,
  id INT,
  styles_id INT,
  url TEXT,
  thumbnail_url TEXT,
  PRIMARY KEY (pk),
  UNIQUE (id),
  CONSTRAINT fk_styles
    FOREIGN KEY (styles_id)
    REFERENCES sdc.products.styles(styles_id)
);

CREATE TABLE sdc.products.skus (
  pk SERIAL,
  id INT,
  styles_id INT,
  size TEXT,
  quantity INT,
  PRIMARY KEY (pk),
  UNIQUE (id),
  CONSTRAINT fk_styles
    FOREIGN KEY (styles_id)
    REFERENCES sdc.products.styles(styles_id)
);

CREATE TABLE sdc.products.features (
  pk SERIAL,
  id INT,
  product_id INT,
  feature TEXT,
  value TEXT,
  PRIMARY KEY (pk),
  UNIQUE (id),
  CONSTRAINT product_id
    FOREIGN KEY (product_id)
    REFERENCES sdc.products.product(id)
);




-- ETL

COPY sdc.products.product(id, name, slogan, description, category, default_price)
FROM '/Users/n8/HackReactor/Coding/sandc/SanDC/sdc/sdc-overview/sdc-dbs/data/product.csv'
DELIMITER ','
CSV HEADER;


COPY sdc.products.styles(styles_id, product_id, name, sale_price, original_price, style_default)
FROM '/Users/n8/HackReactor/Coding/sandc/SanDC/sdc/sdc-overview/sdc-dbs/data/styles.csv'
DELIMITER ','
CSV HEADER;

COPY sdc.products.photos(id, styles_id, url, thumbnail_url)
FROM '/Users/n8/HackReactor/Coding/sandc/SanDC/sdc/sdc-overview/sdc-dbs/data/photos.csv'
DELIMITER ','
CSV HEADER;


COPY sdc.products.skus(id, styles_id, size, quantity)
FROM '/Users/n8/HackReactor/Coding/sandc/SanDC/sdc/sdc-overview/sdc-dbs/data/skus.csv'
DELIMITER ','
CSV HEADER;

COPY sdc.products.features(id, product_id, feature, value)
FROM '/Users/n8/HackReactor/Coding/sandc/SanDC/sdc/sdc-overview/sdc-dbs/data/features.csv'
DELIMITER ','
CSV HEADER;