
var products = {
  getList: async function(cb, pool, page = 1, count = 5) {
    try {
      var result = await pool.query(`SELECT * FROM sdc.products.product LIMIT ${count} OFFSET ${(page - 1) * count}`);
      // console.log(result);
      cb(result);
    } catch (err) {
      console.log('error: ', err);
    }},
  getFeatures: async function(cb, pool, product_id) {
    try {
      var result = await pool.query(`SELECT feature, value FROM sdc.products.features WHERE product_id = ${product_id}`);
      return result;
    } catch (err) {
      console.log('error: ', err);
    }},
  // getSpecificProduct
  getSpecific: async function(cb, pool, product_id) {
    try {
      return await pool.query(
        `SELECT
          sdc.products.product.id, sdc.products.product.name,
          sdc.products.product.slogan, sdc.products.product.description,
          sdc.products.product.category, sdc.products.product.default_price
        FROM sdc.products.product WHERE id = ${product_id}`
      ).then ((prod) => {
        return products.getFeatures(() => {}, pool, product_id)
          .then ((features) => {
            prod.rows[0].features = features.rows;
            // cb(prod.rows[0]);
            return(prod.rows[0]);
          });
      })
    } catch (err) {
      console.log('error: ', err);
      return err;
    }},
  // getSpecificProduct
  getSpecificV2: async function(cb, pool, product_id) {
    try {
      var result = await pool.query(
        `SELECT
          sdc.products.product.id, sdc.products.product.name,
          sdc.products.product.slogan, sdc.products.product.description,
          sdc.products.product.category, sdc.products.product.default_price,
          sdc.products.features.feature, sdc.products.features.value
        FROM
          sdc.products.product INNER JOIN sdc.products.features
        ON
          sdc.products.product.id = sdc.products.features.product_id
        WHERE
          sdc.products.product.id = ${product_id}`);

      // var resultObj = result.rows[0];
      // resultObj[features] = result.rows.shift();
      // // if continuing this route, finish

      return result;

    } catch (err) {
      console.log('error: ', err);
      return err;
    }},
  // get photo information
  getPhotos: async function(cb, pool, style_id) {
    try {
      return await pool.query(`SELECT * FROM sdc.products.photos WHERE styles_id = ${style_id}`);
    } catch (err) {
      console.log('error: ', err);
    }},
  // get SKUS
  getSKUS: async function(cb, pool, style_id) {
    try {
      return await pool.query(`SELECT * FROM sdc.products.skus WHERE styles_id = ${style_id}`);
    } catch (err) {
      console.log('error: ', err);
    }},
  // get styles
  getStyles: async function(cb, pool, product_id) {
    try {
      return await pool.query(`SELECT * FROM sdc.products.styles WHERE product_id = ${product_id}`)
        .then ((style) => {
          // console.log(style);
          var styleObj = {};
          styleObj.product_id = product_id.toString();
          styleObj.results = style.rows;
          // console.log('style obj', styleObj);
          return styleObj;
        })
      } catch (err) {
        console.log('error: ', err);
      }
    },
  };

module.exports.products = products;
