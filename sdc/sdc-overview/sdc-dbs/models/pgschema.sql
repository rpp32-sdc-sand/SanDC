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
  style_id INT,
  product_id INT,
  name VARCHAR (50),
  sale_price VARCHAR (11),
  original_price VARCHAR (11),
  "default?" BOOLEAN,
  PRIMARY KEY (pk),
  UNIQUE (style_id),
  CONSTRAINT fk_products
    FOREIGN KEY (product_id)
    REFERENCES sdc.products.product(id)
);

CREATE TABLE sdc.products.photos (
  pk SERIAL,
  id INT,
  style_id INT,
  url TEXT,
  thumbnail_url TEXT,
  PRIMARY KEY (pk),
  UNIQUE (id),
  CONSTRAINT fk_styles
    FOREIGN KEY (style_id)
    REFERENCES sdc.products.styles(style_id)
);

CREATE TABLE sdc.products.skus (
  pk SERIAL,
  id INT,
  style_id INT,
  size TEXT,
  quantity INT,
  PRIMARY KEY (pk),
  UNIQUE (id),
  CONSTRAINT fk_styles
    FOREIGN KEY (style_id)
    REFERENCES sdc.products.styles(style_id)
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
-- FROM '/Users/n8/HackReactor/Coding/sandc/SanDC/sdc/sdc-overview/sdc-dbs/data/product.csv'
FROM '/home/ubuntu/sdc/SanDC/sdc/sdc-overview/sdc-dbs/data/product.csv'
DELIMITER ','
CSV HEADER;


COPY sdc.products.styles(style_id, product_id, name, sale_price, original_price, "default?")
-- FROM '/Users/n8/HackReactor/Coding/sandc/SanDC/sdc/sdc-overview/sdc-dbs/data/styles.csv'
FROM '/home/ubuntu/sdc/SanDC/sdc/sdc-overview/sdc-dbs/data/styles.csv'
DELIMITER ','
CSV HEADER;

COPY sdc.products.photos(id, style_id, url, thumbnail_url)
-- FROM '/Users/n8/HackReactor/Coding/sandc/SanDC/sdc/sdc-overview/sdc-dbs/data/photos.csv'
FROM '/home/ubuntu/sdc/SanDC/sdc/sdc-overview/sdc-dbs/data/photos.csv'
DELIMITER ','
CSV HEADER;


COPY sdc.products.skus(id, style_id, size, quantity)
-- FROM '/Users/n8/HackReactor/Coding/sandc/SanDC/sdc/sdc-overview/sdc-dbs/data/skus.csv'
FROM '/home/ubuntu/sdc/SanDC/sdc/sdc-overview/sdc-dbs/data/skus.csv'
DELIMITER ','
CSV HEADER;

COPY sdc.products.features(id, product_id, feature, value)
-- FROM '/Users/n8/HackReactor/Coding/sandc/SanDC/sdc/sdc-overview/sdc-dbs/data/features.csv'
FROM '/home/ubuntu/sdc/SanDC/sdc/sdc-overview/sdc-dbs/data/features.csv'
DELIMITER ','
CSV HEADER;


CREATE INDEX idx_products_id on sdc.products.product(id);
CREATE INDEX idx_styles_by_productid on sdc.products.styles(product_id);
CREATE INDEX idx_photos_by_stylesid on sdc.products.photos(style_id);
CREATE INDEX idx_skus_by_stylesid on sdc.products.skus(style_id );
CREATE INDEX idx_features_by_productid on sdc.products.features(product_id);