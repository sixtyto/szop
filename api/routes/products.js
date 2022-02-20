const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
  Product.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

router.post('/', (req, res) => {
  const newProduct = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });

  newProduct.save()
    .then(data => {
      res.status(201).json(data)
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

router.get('/:productId', (req, res) => {
  const { productId } = req.params;

  Product.findById(productId)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

router.put('/:productId', (req, res) => {
  const { productId } = req.params;

  const updatedProduct = {
    name: req.body.name,
    price: req.body.price,
  };

  Product.findByIdAndUpdate(productId, updatedProduct)
    .then(() => {
      res.status(200).json({
        message: `Product ${productId} updated successfully`,
      });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

router.delete('/:productId', (req, res) => {
  const { productId } = req.params;

  Product.findByIdAndDelete(productId)
    .then(() => {
      res.status(200).json({
        message: `Product ${productId} deleted successfully`,
      });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

module.exports = router;
