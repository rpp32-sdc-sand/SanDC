const request = require('supertest');
const assert = require('assert');
var expect = require('chai').expect;
const express = require('express');
const app = require('./index.js');
const { Pool, Client} = require('pg');
const models = require('./sdc-overview/sdc-dbs/models/index.js');




xdescribe('GET /', function() {
  it('responds with 200', function(done) {
    request(app)
    .get('/')
    .expect(200, done);
  });
});


describe('product overview tests', function() {
  const pool = new Pool({
    user: 'ubuntu',
    password: '',
    database: 'sdc',
    host: '52.91.62.180',
    port: '5432',
    // max: 1,
    // idleTimeoutMillis: 0
  });

  describe('test specific product api', function () {
    it('getSpecific should return productID1', async function () {
      var productID1 = {
        id: 1,
        name: 'Camo Onesie',
        slogan: 'Blend in to your crowd',
        description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
        category: 'Jackets',
        default_price: '140',
        features: [
          { feature: 'Fabric', value: 'Canvas' },
          { feature: 'Buttons', value: 'Brass' }
        ]
      }

      var result = await models.products.getSpecific(pool, 1);

      expect(JSON.stringify(result)).to.equal(JSON.stringify(productID1));
    });

    xit('getSpecificV2 should return productID1', async function () {
      var productID1 = {
        id: 1,
        name: 'Camo Onesie',
        slogan: 'Blend in to your crowd',
        description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
        category: 'Jackets',
        default_price: '140',
        features: [
          { feature: 'Fabric', value: 'Canvas' },
          { feature: 'Buttons', value: 'Brass' }
        ]
      }

      var result = await models.products.getSpecific(pool, 1);
      console.log(result);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(productID1));
    });

  });

  describe('test style api', function () {
    it('get style should return', async function () {
      var style1 = {
        product_id: '1',
        results: [
          {
            pk: 1,
            styles_id: 1,
            product_id: 1,
            name: 'Forest Green & Black',
            sale_price: 'null',
            original_price: '140',
            'default?': true
          },
          {
            pk: 2,
            styles_id: 2,
            product_id: 1,
            name: 'Desert Brown & Tan',
            sale_price: 'null',
            original_price: '140',
            'default?': false
          },
          {
            pk: 3,
            styles_id: 3,
            product_id: 1,
            name: 'Ocean Blue & Grey',
            sale_price: '100',
            original_price: '140',
            'default?': false
          },
          {
            pk: 4,
            styles_id: 4,
            product_id: 1,
            name: 'Digital Red & Black',
            sale_price: 'null',
            original_price: '140',
            'default?': false
          },
          {
            pk: 5,
            styles_id: 5,
            product_id: 1,
            name: 'Sky Blue & White',
            sale_price: '100',
            original_price: '140',
            'default?': false
          },
          {
            pk: 6,
            styles_id: 6,
            product_id: 1,
            name: 'Dark Grey & Black',
            sale_price: 'null',
            original_price: '170',
            'default?': false
          }
        ]
      }

      var result = await models.products.getStyles(pool, 1);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(style1));
    });
    // add more
  });


});




