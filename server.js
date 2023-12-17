// imports
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const exphbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const { Post, User } = require('./models');
const bodyParser = require('body-parser');


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


// setup partials view 
const partialsDir = exphbs.create({
  partialPath: [path.join(__dirname, 'views', 'partials')]
})


// set up handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// set public folder and other middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sess));


// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// serve static files from the 'seeds' directory
app.use('/seeds/blogpostData', express.static('seeds'));


// get blog posts from db and render on homepage 
app.get('/', async (req, res) => {
  try {
    // Fetch all blog posts from the database
    const postData = await Post.findAll();

    // Convert Sequelize instances to plain JavaScript objects
    const blogPosts = postData.map((post) => post.get({ plain: true }));

    // Render the 'home' view with the retrieved blog posts
    res.render('home', { blogPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// API routes
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

//login reflection 
const sampleUser = {
  username: 'JohnDoe',
  isLoggedIn: false,
};

// logout handler 
app.post('/logout', (req, res) => {
  // Clear the session data
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.render('logout', { isAuthenticated: false });
  });
});


//post server side handler
let blogPosts = [];

// Route to create a new blog post
app.post('/api/post', (req, res) => {
  const { name, description } = req.body;
  const newPost = {
    id: blogPosts.length + 1,
    name,
    description,
    date_created: new Date().toISOString(),
    comments: []
  };
  blogPosts.push(newPost);
  res.status(201).json(newPost);
});

// Route to get all blog posts
app.get('/api/post', (req, res) => {
  res.json(blogPosts);
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
