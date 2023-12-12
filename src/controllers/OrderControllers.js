const crypto = require('crypto');

const Order = require('../models/OrdersModel');
const Product = require('../models/ProductsModel');

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      shopId,
      productId,
      refferal,
      deliveryServiceId,
      paymentMethodId,
      addressId,
      amount,
      price,
      cost,
      totalPayment,
    } = req.body;

    const orderId = crypto.randomBytes(16).toString('hex');

    const response = await Order.create({
      order_id: orderId,
      user_id: userId,
      shop_id: shopId,
      product_id: productId,
      refferal,
      delivery_service_id: deliveryServiceId,
      payment_method_id: paymentMethodId,
      address_id: addressId,
      amount,
      price,
      cost,
      total_payment: totalPayment,
      status: 'Menunggu Pembayaran',
    });
    res.status(201).json({ msg: 'Order Created!', data: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

const getAllOrdersByUserId = async (req, res) => {
  try {
    const response = await Order.findAndCountAll({
      where: {
        user_id: req.params.id,
      },
    });
    if (response) {
      res.status(200).json({ msg: 'Order found!', data: response });
    } else {
      res.status(404).json({ msg: 'Order not found!' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getAllOrdersByShopId = async (req, res) => {
  try {
    const response = await Order.findAndCountAll({
      where: {
        shop_id: req.params.id,
      },
    });
    if (response) {
      res.status(200).json({ msg: 'Order found!', data: response });
    } else {
      res.status(404).json({ msg: 'Order not found!' });
    }
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const getAllOrdersByProductId = async (req, res) => {
  try {
    const response = await Order.findOne({
      where: {
        product_id: req.params.id,
      },
    });
    if (response) {
      res.status(200).json({ msg: 'Order found!', data: response });
    } else {
      res.staus(404).json({ msg: 'Order not found!' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: {
        order_id: req.params.id,
      },
    });

    const {
      refferal,
      deliveryServiceId,
      paymentMethodId,
      addressId,
      amount,
      price,
      cost,
      totalPayment,
    } = req.body;

    if (order) {
      order.refferal = refferal || order.refferal;
      order.delivery_service_id = deliveryServiceId || order.delivery_service_id;
      order.payment_method_id = paymentMethodId || order.payment_method_id;
      order.address_id = addressId || order.address_id;
      order.amount = amount || order.amount;
      order.price = price || order.price;
      order.cost = cost || order.cost;
      order.total_payment = totalPayment || order.total_payment;

      const response = await order.save();
      res.status(200).json({ msg: 'Order Updated!', data: response });
    } else {
      res.status(400).json({ msg: 'Invalid order update!' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const receiveOrderShop = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: {
        order_id: req.params.id,
      },
    });

    const product = await Product.findOne({
      where: {
        product_id: order.product_id,
      },
    });

    const status = 'Sedang di proses';
    if (order) {
      order.status = status || order.status;
      const response = await order.save();

      const stockReduced = product.product_stock - 1;
      product.product_stock = stockReduced;
      await product.save();

      res.status(200).json({ msg: 'Order received & Users cannot cancel order!', data: response });
    } else {
      res.status(400).json({ msg: 'Cannot accept order!' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: {
        order_id: req.params.id,
      },
    });
    const status = 'Order cancelled';
    if (order) {
      order.status = status || order.status;

      const response = await order.save();
      res.status(200).json({ msg: 'Order Canceled!', data: response });
    } else {
      res.status(400).json({ msg: 'Order cannot be cancelled!' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrdersByUserId,
  getAllOrdersByShopId,
  getAllOrdersByProductId,
  updateOrder,
  receiveOrderShop,
  cancelOrder,
};
