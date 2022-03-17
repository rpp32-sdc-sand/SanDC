const express = require('express');

const productRouter = require('express').Router();
const bodyParser = require('body-parser');

const models = require('../sdc-overview/sdc-dbs/models/index.js');
const { pool } = require('./db.js');

productRouter.use(express.json());
productRouter.use(bodyParser.urlencoded({extended: false}));
productRouter.use(bodyParser.json());



productRouter.get('/', async (req, res) => {
  res.sendStatus(200);
});

productRouter.get('/products', async (req, res) => {
  res.sendStatus(200);
});

productRouter.get('/:product_id', async (req, res) => {
  var product_id = req.params.product_id;

  models.products.getSpecific(pool, product_id)
    .then((product) => {
      res.send(product);
    })
    .catch((error) => {
      res.sendStatus(400);
    });
});


productRouter.get('/:product_id/styles', async (req, res) => {
  var product_id = req.params.product_id;

  models.products.getStyles(pool, product_id)
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    res.sendStatus(400);
  });
});


module.exports = productRouter;