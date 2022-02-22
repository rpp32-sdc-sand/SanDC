\c sdc
COPY sdc.products.product(product_id, name, slogan, description, category, default_price)
FROM '/Users/n8/HackReactor/Coding/sandc/SanDC/sdc/sdc-overview/sdc-dbs/data/product.csv'
DELIMITER ','
CSV HEADER;


COPY sdc.products.styles(styles_id, product_id, name, sale_price, original_price, style_default)
FROM '/Users/n8/HackReactor/Coding/sandc/SanDC/sdc/sdc-overview/sdc-dbs/data/styles.csv'
DELIMITER ','
CSV HEADER;


COPY sdc.products.skus(skus_id, styles_id, size, quantity)
FROM '/Users/n8/HackReactor/Coding/sandc/SanDC/sdc/sdc-overview/sdc-dbs/data/skus.csv'
DELIMITER ','
CSV HEADER;