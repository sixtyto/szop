const Product = require('../models/product');
const mongoose = require('mongoose');

exports.getAll = (req, res, next) => {
  Product.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(400).json({ error });
    });
};

exports.add = (req, res, next) => {
  const newProduct = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  });

  newProduct.save()
    .then(data => {
      res.status(201).json(data)
    })
    .catch(error => {
      res.status(400).json({ error });
    });
};

exports.getOne = (req, res, next) => {
  const { productId } = req.params;

  Product.findById(productId)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(error => {
      res.status(400).json({ error });
    });
};

exports.update = (req, res, next) => {
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
};

exports.delete = (req, res, next) => {
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
};
