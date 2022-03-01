const axios = require('axios');
const gitToken = require('../config.js');


const getSpecificProduct = (productId) => {
  let options = {
    method: 'GET',
    // url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}`,
    url: `http://localhost:3050/fec2/hr-rpp/products/${productId}`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // console.log('options 18:', options);
      console.log('error:', error);
    });
};

const getProductStyles = (productId) => {
  let options = {
    method: 'GET',
    // url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}/styles`,
    url: `http://localhost:3050/fec2/hr-rpp/products/${productId}/styles`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then((response) => {
      console.log('client styles 31: ');
      console.log(response.data);
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