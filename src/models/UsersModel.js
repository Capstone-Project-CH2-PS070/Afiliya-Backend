const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UsersModel = sequelize.define('tb_users', {
  user_id: {
    type: DataTypes.STRING,

    primaryKey: true,
    allowNull: false,
  },

  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  isVerification: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  telephone: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  birthplace: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  birthdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  isAffiliator: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  isShop: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = UsersModel;
