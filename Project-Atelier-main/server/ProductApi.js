const axios = require('axios');
const gitToken = require('../config.js');


const getSpecificProduct = (productId) => {
  let options = {
    method: 'GET',
    url: `http://3.82.163.215:3050/fec2/hr-rpp/products/${productId}`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('error:', error);
      return error;
    });
};

const getProductStyles = (productId) => {
  let options = {
    method: 'GET',
    url: `http://3.82.163.215:3050/fec2/hr-rpp/products/${productId}/styles`,
    headers: { Authorization: gitToken.Token },
  };

  return axios(options)
    .then((response) => {

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