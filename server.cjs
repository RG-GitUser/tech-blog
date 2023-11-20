// server.js

const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const connect = require('connect');
const SequelizeStore = require('connect-session-sequelize');
const path = require('path');

const app = express();

// Handlebars setup
const hbs = exphbs.create({
  layoutsDir: path.join(__dirname, 'views/layouts'),
 
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');



// Handlebars setup
app.engine('handlebars', exphbs());
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
