const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AddressesModel = sequelize.define('tb_user_address', {
  address_id: {
    type: DataTypes.INTEGER,

    primaryKey: true,
    allowNull: false,
  },

  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  province: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  sub_district: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  address_details: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  placename: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  recipient_info: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = AddressesModel;
