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
  product_id = 1;

  models.products.getSpecific(() => {}, pool, product_id)
    .then((product) => {
      // console.log('prod: ', product);
      res.send(product);
    });
});


productRouter.get('/:product_id/styles', async (req, res) => {
  console.log('getting styles in routes');
  var product_id = req.params.product_id;
  product_id = 1;

  models.products.getStyles(() => {}, pool, product_id)
    .then((style) => {
      var styleId;
      var promiseArray = [];
      for(var i = 0; i < style.results.length; i++) {
        styleId = style.results[i].styles_id;
        promiseArray.push(models.products.getPhotos(() => {}, pool, styleId));
      }
      // console.log('promiseArray.length: ', promiseArray.length);
      return Promise.all(promiseArray).then((resolved) => {
        resolved.forEach((element, index) => {
          style.results[index].photos = element.rows;
        })
        return style;
      });
    }).then((styleWithPhotos) => {
      // add skus
      // console.log('obj with photos: ', styleWithPhotos);

      var styleId;
      var promiseArray = [];
      for(var i = 0; i < styleWithPhotos.results.length; i++) {
        styleId = styleWithPhotos.results[i].styles_id;
        promiseArray.push(models.products.getSKUS(() => {}, pool, styleId));
      }

      Promise.all(promiseArray).then((resolved) => {
        resolved.forEach((element, index) => {
          styleWithPhotos.results[index].skus = element.rows;
        })
        res.send(styleWithPhotos);
      });
    })
});


module.exports = productRouter;