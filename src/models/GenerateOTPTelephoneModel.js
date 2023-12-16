const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const GenerateOTPTelephoneModel = sequelize.define('tb_otp_telephones', {
  user_id_otp_telephone: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: true,
    autoIncrement: true,
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: false,
});

module.exports = GenerateOTPTelephoneModel;
