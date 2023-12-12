const { DataTypes } = require('sequelize');
const sequelize = require('../db_config');

const ProductsModel = sequelize.define('tb_products', {
  product_id: {
    type: DataTypes.STRING,

    primaryKey: true,
    allowNull: false,
  },

  shop_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  product_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  product_image: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  product_stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  product_ctg: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  height: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  width: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = ProductsModel;
