const { pool } = require('../db.js');
const models = require('../models/index.js');

var products = {
  getList: async function(req, res) {
    models.products.getList(function(list) {
      return list;
    }, pool, 2, 5);
    // await pool.end();
  },
  getSpecific: async function(req, res) {
    models.products.getSpecific(function(product) {
      res.send(product);

    }, pool, 64620);
    // await pool.end();
  },
  getFeatures: async function(req, res) {
    models.products.getFeatures(function(features) {
      return features;
    }, pool, 64620);
    // await pool.end();
  }
};



products.getFeatures();
products.getSpecific();

module.exports.products = products;