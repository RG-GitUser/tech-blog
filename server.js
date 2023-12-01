// imports
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');

require('dotenv').config(); // load environment variables

// sequelize for storing session data in the database
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// specifying the port and express
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();

// middleware config "sess"
const sess = {
  secret: process.env.SESSION_SECRET || 'SuperSecretSecret',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    secure: false,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// set up handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// set public folder and other middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sess));

// serve static files from the 'seeds' directory
app.use('./seeds/blogpostData', express.static('seeds'));

// API route
app.use(require('./controllers'));


// Middleware to set navbar partial for all views
app.use((req, res, next) => {
  res.locals.navbar = 'navbar';
  next();
});



// global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message);
});

// syncing database with sequelize
sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Error syncing Sequelize models:', error);
  });
