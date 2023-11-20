
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tech_blog', 'root', 'UNBbootcamp!23', {
  host: 'localhost',
  dialect: 'mysql', // Choose your database dialect
  logging: false, // Set to true to log SQL queries (optional)
});

// Define your models here
// Example:
// const User = sequelize.define('User', { /* model attributes */ });

// Sync the models with the database
sequelize.sync();

// Export the Sequelize instance
module.exports = sequelize;
