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

//middleware config "sess" 
const sess = {
  secret: process.env.SESSION_SECRET || 'SuperSecretSecret', 
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    secure: false, // Set to true if your app is served over HTTPS
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};



app.use(session(sess));
const hbs = exphbs.create({ defaultLayout: 'main' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));
 

//middleware config to parse JSON 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//gets the routes uses from controllers 
app.use(routes);

// ... (your imports and middleware configurations)

// Route for rendering handlebars view
app.get('/', (req, res, next) => {
  try {
    res.render('home', { pageTitle: 'Home Page' });
  } catch (error) {
    next(error);
  }
});

// Use routes middleware
app.use(routes);


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



