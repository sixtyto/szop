const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_NAME}.omyig.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);

app.use(morgan('dev'));
app.use(cors())
app.use(bodyParser.json());

// routes
const products = require('./api/routes/products');
const orders = require('./api/routes/orders');
const users = require('./api/routes/users');

app.use('/uploads', express.static('uploads'));
app.use('/products', products);
app.use('/orders', orders);
app.use('/users', users);

app.use((req, res, next) => {
  res.status(404)
    .json({
      message: 'It can not be found!'
    });
});

module.exports = app;
