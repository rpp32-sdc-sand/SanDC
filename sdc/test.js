const request = require('supertest');
const assert = require('assert');
const express = require('express');
const app = require('./index.js');
const { Pool, Client} = require('pg');




describe('GET /', function() {
  it('responds with 200', function(done) {
    request(app)
    .get('/')
    .expect(200, done);
  });
});





// tests for requests related to product overview
// get products
// GET /products/:product_id
// GET /products/:product_id/styles
// GET /products/:product_id/related



// check product overview dbs
// describe('product overview dbs', function() {
//   beforeEach(() => {
//     const pool = new Pool({
//       user: 'postgres',
//       host: ''

//     })
//   });
// });