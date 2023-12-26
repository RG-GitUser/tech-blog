
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tech_blog', 'root', 'UNBbootcamp!23', {
  host: 'localhost',
  dialect: 'mysql', 
  logging: false,
});



// Sync the models with the database
sequelize.sync();

// Export the Sequelize instance
module.exports = sequelize;
