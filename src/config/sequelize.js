// sequelize.js

const { Sequelize } = require('sequelize');

// Replace 'your_database', 'your_username', 'your_password' with your actual database credentials
const sequelize = new Sequelize('tech_blog', 'root', 'UNBbootcamp!23', {
  host: 'localhost',
  dialect: 'mysql', // Choose your database dialect
  logging: false, // Set to true to log SQL queries (optional)
});

//example 
const User = sequelize.define('User', {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  // Other model attributes
});

// Sync the models with the database
sequelize.sync();

// Export the Sequelize instance
module.exports = sequelize;
