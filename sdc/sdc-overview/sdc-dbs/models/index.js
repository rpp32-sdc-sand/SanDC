
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
      return await pool.query(`SELECT * FROM sdc.products.photos WHERE style_id = ${style_id}`);
    } catch (err) {
      console.log('error: ', err);
    }},
  // get SKUS
  getSKUS: async function(cb, pool, style_id) {
    try {
      return await pool.query(`SELECT * FROM sdc.products.skus WHERE style_id = ${style_id}`);
    } catch (err) {
      console.log('error: ', err);
    }},
  // get styles
  getStyles: async function(cb, pool, product_id) {
    try {
      return await pool.query(
        `SELECT style_id, product_id, name, sale_price, original_price, "default?"
        FROM sdc.products.styles WHERE product_id = ${product_id}
      `)
      .then((style) => {
        var styleId;
        var promiseArray = [];
        for(var i = 0; i < style.rows.length; i++) {
          styleId = style.rows[i].style_id;
          if (style.rows[i].sale_price === "null") {
            style.rows[i].sale_price = null;
          }
          promiseArray.push(products.getPhotos(() => {}, pool, styleId));
        }
        return Promise.all(promiseArray).then((resolved) => {
          resolved.forEach((element, index) => {
            style.rows[index].photos = element.rows;
          });
          return style;
        });
      }).then((styleWithPhotos) => {
        // add skus
        var styleId;
        var promiseArray = [];
        for(var i = 0; i < styleWithPhotos.rows.length; i++) {
          styleId = styleWithPhotos.rows[i].style_id;
          promiseArray.push(products.getSKUS(() => {}, pool, styleId));
        }

        return Promise.all(promiseArray).then((resolved) => {
          resolved.forEach((element, index) => {
            styleWithPhotos.rows[index].skus = {};
            for (var i = 0; i < element.rows.length; i++) {
              var key = element.rows[i].id;
              styleWithPhotos.rows[index].skus[key] = {
                quantity: element.rows[i].quantity,
                size: element.rows[i].size
              }
            }
          });

          return ({product_id: product_id,
            results: styleWithPhotos.rows
          });
        });
      })
      } catch (err) {
        console.log('error: ', err);
      }
    },
  };

module.exports.products = products;
