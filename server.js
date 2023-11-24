//imports
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');

require('dotenv').config(); //load environment variables

//sequilize for storing session data in db 
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//specifying the port and express 
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//middleware config "sess" 
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

app.use(session(sess));
//gets the routes for middleware
app.use(routes);

// Route for rendering handlebars view
app.get('/', async (req, res, next) => {
  try {
    res.render('home', { pageTitle: 'Home Page' });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// syncing database with sequelize 
sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Error syncing Sequelize models:', error);
  }); 


