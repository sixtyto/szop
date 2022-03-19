const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const OrdersController = require('../controllers/orders');

router.get('/', auth, OrdersController.getAll);

router.post('/', OrdersController.add);

router.get('/:orderId', auth, OrdersController.getOne);

router.delete('/:orderId', auth, OrdersController.delete);

module.exports = router;
