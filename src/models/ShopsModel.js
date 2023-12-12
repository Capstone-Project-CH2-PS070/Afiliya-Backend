const { DataTypes } = require('sequelize');
const sequelize = require('../db_config');

const ShopsModel = sequelize.define('tb_shops', {
  shop_id: {
    type: DataTypes.STRING,

    primaryKey: true,
    allowNull: false,
  },

  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  shop_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  shop_image: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  shop_ctg: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  telephone: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = ShopsModel;
