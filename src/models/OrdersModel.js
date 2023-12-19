const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrdersModel = sequelize.define('tb_orders', {
  order_id: {
    type: DataTypes.STRING,

    primaryKey: true,
    allowNull: false,
  },

  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  shop_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  product_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  refferal: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  delivery_service_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  payment_method_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  address_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  cost: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  total_payment: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = OrdersModel;
