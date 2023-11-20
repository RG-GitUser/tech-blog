// app.js

import express from 'express';
import { engine } from 'express-handlebars';
import session from 'express-session';
import connect from 'connect';
import SequelizeStore from 'connect-session-sequelize';
const path = require('path');

const app = express();

// Handlebars setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

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
