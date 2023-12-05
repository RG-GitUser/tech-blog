// imports
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const exphbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const { Post } = require('../../models');
const authenticate = require('../../utils/auth');

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


//Route to homepage with blog post data
app.get('/', (req, res) => {
  res.render('home', { blogPosts: blogpostData });
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


// create post server side handler 
router.post('/api/post', authenticate, async (req, res) => {
  try {
    const { title, content, username } = req.body;

    //log the data
    console.log('Received data:', { title, content, username });

    // Create a new post
    const newPost = await Post.create({
      title,
      content,
      username,
    });

    blogpostData.push({
      id: newPost.id,
      title: newPost.title,
      content: newPost.content,
      dateCreated: newPost.date_created,  
      username: newPost.username,
      comments: [],  // Initialize with an empty array
    });

    // Redirect to the homepage or send a success response
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
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
