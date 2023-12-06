const { Sequelize } = require('sequelize');

const {
  DATABASE_URL, DATABASE_NAME, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD,
} = process.env;

const connectToDB = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
  host: DATABASE_URL,
  port: DATABASE_PORT,
  dialect: 'mysql',
});

module.exports = connectToDB;
