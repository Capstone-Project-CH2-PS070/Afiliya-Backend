const express = require('express');
const Multer = require('multer');

const multer = Multer();

const {
  createOrder,
  getAllOrdersByUserId,
  getAllOrdersByShopId,
  getAllOrdersByProductId,
  updateOrder,
  receiveOrderShop,
  cancelOrder,
} = require('../controllers/OrderControllers');

const router = express.Router();

router.get('/orders/user/:id', getAllOrdersByUserId);
router.get('/orders/:id', getAllOrdersByProductId);
router.get('/orders/shop/:id', getAllOrdersByShopId);
router.patch('/orders/:id/update', multer.none(), updateOrder);
router.post('/orders', multer.none(), createOrder);
router.post('/orders/:id/accept', multer.none(), receiveOrderShop);
router.post('/orders/:id/cancel', cancelOrder);

module.exports = router;
