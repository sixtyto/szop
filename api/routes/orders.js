const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');

router.get('/', (req, res) => {
  Order.find()
    .populate('productId')
    .then(orders => {
      res.status(200).json(orders);
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

router.post('/', (req, res) => {
  const newOrder = new Order({
    _id: new mongoose.Types.ObjectId(),
    productId: req.body.productId,
    quantity: req.body.quantity,
  });

  newOrder.save()
    .then(data => {
      res.status(201).json(data)
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

router.get('/:orderId', (req, res) => {
  const { orderId } = req.params;

  Order.findById(orderId)
    .populate('productId')
    .then(order => {
      res.status(200).json(order)
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

router.delete('/:orderId', (req, res) => {
  const { orderId } = req.params;

  Order.findByIdAndRemove(orderId)
    .then(() => {
      res.status(200).json({
        message: `Order ${orderId} deleted successfully`,
      });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

module.exports = router;
