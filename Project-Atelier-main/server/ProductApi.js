const axios = require('axios');
const gitToken = require('../config.js');


const getSpecificProduct = (productId) => {
  productId = 1000012;
  let options = {
    method: 'GET',
    // hr api
    // url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}`,
    // local test
    url: `http://localhost:3050/fec2/hr-rpp/products/${productId}`,
    // sdc api
    // url: `http://3.82.163.215:3050/fec2/hr-rpp/products/${productId}`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then((response) => {
      // console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      // console.log('options 18:', options);
      console.log('error:', error);
      return error;
    });
};

const getProductStyles = (productId) => {
  productId = 1;
  let options = {
    method: 'GET',
    // url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}/styles`,
    url: `http://localhost:3050/fec2/hr-rpp/products/${productId}/styles`,
    // url: `http://3.82.163.215:3050/fec2/hr-rpp/products/${productId}/styles`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then((response) => {
      // console.log('client styles 31: ');
      // console.log(response.data);
      // console.log('>>>>>>>>>>>>>>>>>>>');
      // console.log('response.data', response.data.results);
      // console.log('skus0:', response.data.results[0].skus);
      // // console.log('skus1:', response.data.results[1].skus);
      // // console.log('skus0 data:', response.data.results[0].skus['2313078']);
      // console.log('<<<<<<<<<<<<<<<<<<');
      return response.data;
    });
};
const getProductReviews = (productId) => {
  let options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=${productId}`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then((response) => {
      return response.data;
    });
};

module.exports = {
  getSpecificProduct,
  getProductStyles,
  getProductReviews,
};