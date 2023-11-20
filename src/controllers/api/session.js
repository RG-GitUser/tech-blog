// session.js

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./connection'); // Import your Sequelize connection

const sessionConfig = {
  secret: 'your_secret_key', // Replace with a strong, randomly generated secret
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds (15 minutes)
    expiration: 24 * 60 * 60 * 1000, // The maximum age (in milliseconds) of a valid session (1 day)
  }),
};

module.exports = session(sessionConfig);
