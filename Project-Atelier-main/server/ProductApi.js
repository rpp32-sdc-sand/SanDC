const axios = require('axios');
const gitToken = require('../config.js');

var aws = '52.91.189.60';

const getSpecificProduct = (productId) => {
  let options = {
    method: 'GET',
    url: `http://${aws}/products/${productId}`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

const getProductStyles = (productId) => {
  let options = {
    method: 'GET',
    url: `http://${aws}/products/${productId}/styles`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then((response) => {

      return response.data;
    }).catch((error) => {
      return error;
    });
};

//Try messing with this one
const getProductReviews = (productId) => {
  let options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=${productId}`,
    //url: `http://localhost:3050/fec2/hr-rpp/reviews/${productId}`,
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