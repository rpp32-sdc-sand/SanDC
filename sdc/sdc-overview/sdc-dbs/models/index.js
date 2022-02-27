// const { pool } = require('../db.js');
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
      return await pool.query(`SELECT * FROM sdc.products.product WHERE id = ${product_id}`)
        .then ((prod) => {
          return products.getFeatures(() => {}, pool, product_id)
          .then ((features) => {
            prod.rows[0].features = features.rows;
            // cb(prod.rows[0]);
            return(prod.rows[0]);
          });
        })
      // return product;
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

            return styleObj;
          })
        // return product;
      } catch (err) {
        console.log('error: ', err);
      }},
}


module.exports.products = products;


// you can also use async/await
// const res = await pool.query('SELECT NOW()');
// await pool.end();

// // clients will also use environment variables
// // for connection information
// const client = new Client();
// await client.connect();

// const res = await client.query('SELECT NOW()');
// await client.end();

// pool.query('SELECT * from sdc.products.product LIMIT $1 OFFSET $2', (err, res) => {
//   console.log(err, res);
//   pool.end();
// });
