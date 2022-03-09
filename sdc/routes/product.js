const express = require('express');

const productRouter = require('express').Router();
const bodyParser = require('body-parser');

const models = require('../sdc-overview/sdc-dbs/models/index.js');
const { pool } = require('./db.js');


productRouter.use(express.json());
productRouter.use(bodyParser.urlencoded({extended: false}));
productRouter.use(bodyParser.json());



productRouter.get('/', async (req, res) => {
  //
  res.sendStatus(200);
});

productRouter.get('/products', async (req, res) => {
  console.log('products route triggered')
  res.sendStatus(200);
});

productRouter.get('/:product_id', async (req, res) => {
  console.log('getting product by id');

  var product_id = req.params.product_id;
  console.log('product_id in get: ', product_id);
  // product_id = 1;

  models.products.getSpecific(() => {}, pool, product_id)
    .then((product) => {
      console.log('prod on server: ', product);
      res.send(product);
    });
});


productRouter.get('/:product_id/styles', async (req, res) => {
  // console.log('getting styles in routes');
  var product_id = req.params.product_id;
  console.log('product_id in productRouter.get:', product_id);
  // product_id = 1;

  models.products.getStyles(() => {}, pool, product_id)
  .then((result) => {
    res.send(result);
  });
});


module.exports = productRouter;