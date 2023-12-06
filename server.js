// imports
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const exphbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const { Post } = require('./models');

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
app.use('/seeds/blogpostData', express.static('seeds'));


// handler for rendering homepage 
app.get('/', async (req, res) => {
  try {
    // Use the Post model to fetch all blog posts from the database
     const blogpostData = await Post.findAll();

    // Render the 'home' template and pass the fetched blogPosts to it
    res.render('home', { blogpostData });
  } catch (error) {
    // Handle any errors that might occur during the database query or rendering
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// API route
app.use(require('./controllers'));


// Middleware to set navbar partial for all views
app.use((req, res, next) => {
  res.locals.navbar = 'navbar';
  next();
});


//sign in server side handler 
app.post('/api/user', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Please provide all required information.' });
  }

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'User with this email already exists.' });
  }
});


//post server side handler


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
