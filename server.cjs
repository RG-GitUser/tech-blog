// server.js

const express = require('express');
const session = require('express-session');
const sessionMiddleware = require('./session.js');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const sequelize = require('./src/config/sequelize.js'); // Import sequelize.js from the config directory

const app = express();

// Handlebars setup
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
  layoutsDir: path.join(__dirname, 'views/layouts'),

});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Session setup with SequelizeStore
const sequelizeStoreOptions = {
  // ... configure your SequelizeStore options
};

const configureSession = (app) => {
  app.use(
    session({
      store: new SequelizeStore(sequelizeStoreOptions),
      secret: 'CHANGEME',
      // ... other session configuration options
    })
  );
};

//Session middleware
app.use(sessionMiddleware);

configureSession(app);

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
