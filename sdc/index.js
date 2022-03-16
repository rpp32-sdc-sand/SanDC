// const newRelic = require('newrelic');
const express = require('express');
const app = express();
const port = 3050;
const path = require('path');
const productRouter = require('./routes/product.js');


app.get('/', (req, res) => {
  res.send('Hello SDC');
});


app.use('/fec2/hr-rpp/products/', productRouter);

app.listen(port, () => {
  console.log(`SDC app listening on port ${port}`);
});


app.get('/productloaderio/', function (req, res) {
  var options = {
    root: path.join(__dirname)
  };
  var fileName = 'loaderio-5d266b869a5c39c0abef546f4d1c50c1.txt';
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    }
    else {
      console.log('Sent:', fileName)
    }
  });
});

module.exports = app;