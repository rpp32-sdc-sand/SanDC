
var products = {
  getList: async function(pool, page = 1, count = 5) {  // unused
    try {
      var result = await pool.query(`SELECT * FROM sdc.products.product LIMIT ${count} OFFSET ${(page - 1) * count}`);
      // console.log(result);
      // cb(result);
      return result;
    } catch (err) {
      console.log('error: ', err);
      throw(err);
    }},
  getFeatures: async function(pool, product_id) {
    try {
      var result = await pool.query(`SELECT feature, value FROM sdc.products.features WHERE product_id = ${product_id}`);
      return result;
    } catch (err) {
      throw(err);
    }},
  // getSpecificProduct
  getSpecific: async function(pool, product_id) {
    // try {
    return await pool.query(
      `SELECT
        sdc.products.product.id, sdc.products.product.name,
        sdc.products.product.slogan, sdc.products.product.description,
        sdc.products.product.category, sdc.products.product.default_price
      FROM sdc.products.product WHERE id = ${product_id}`
    ).then ((prod) => {
      return products.getFeatures(pool, product_id)
        .then ((features) => {
          prod.rows[0].features = features.rows;
          return(prod.rows[0]);
        })
        .catch((err) => {
          throw(err);
        });
    }).catch((err) => {
      throw(err)
    });
  },
  getPhotosV2: async function(pool, style_id) {
    try {
      return await pool.query(`SELECT * FROM sdc.products.photos WHERE style_id = ${style_id}`);
    } catch (err) {
      // console.log('error: ', err);
      throw(err);
    }},
  // get photo information
  getPhotos: async function(pool, style_id) {
      return await pool.query(`SELECT * FROM sdc.products.photos WHERE style_id = ${style_id}`)
        .then((photos) => {
          // if there's no photos at all, make it empty so to not break fe
          if (photos.rows.length === 0) {
            photos.rows[0] = {
              pk: 0,
              id: 0,
              url: '',
              thumbnail_url: ''
            }
          }
          return photos;
        })
        .catch((err) => {
          throw (err);
        });
      },
    // get SKUS
  getSKUS: async function(pool, style_id) {
    try {
      return await pool.query(`SELECT * FROM sdc.products.skus WHERE style_id = ${style_id}`);
    } catch (err) { throw(err);}},
  // get styles
  getStyles: async function(pool, product_id) {

    return await pool.query(
      `SELECT style_id, product_id, name, sale_price, original_price, "default?"
      FROM sdc.products.styles WHERE product_id = ${product_id}`
    ).then((style) => {
      // console.log('>>>>>style:', style);
      // if (style.rowCount === 0) { throw 400};
      var styleId;
      var promiseArray = [];
      for(var i = 0; i < style.rows.length; i++) {
        // console.log('i: ', i);
        // console.log('style rows: ', style.rows[i]);

        styleId = style.rows[i].style_id;
        if (style.rows[i].sale_price === "null") {
          style.rows[i].sale_price = null;
        }
        // console.log(styleId);
        promiseArray.push(products.getPhotos(pool, styleId));
      }
      return Promise.all(promiseArray).then((resolved) => {
        // console.log('resolved:', resolved);
        resolved.forEach((element, index) => {
          // console.log('>>>>>>>>>>>>>>>element: ', element.rows);
          // console.log('element.rows:', element.rows);
          style.rows[index].photos = element.rows;
        });
        return style;
      });
    }).catch( (err) => {
      throw(err);

    }).then((styleWithPhotos) => {
      // add skus
      var styleId;
      var promiseArray = [];
      for(var i = 0; i < styleWithPhotos.rows.length; i++) {
        styleId = styleWithPhotos.rows[i].style_id;
        promiseArray.push(products.getSKUS(pool, styleId));
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
    }).catch((err) => {
      throw(err);
    })
  }
};

module.exports.products = products;
