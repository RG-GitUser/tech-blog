const path = require('path');
const fs = require('fs');
const router = require('express').Router();

// Route for rendering handlebars view (homepage)
router.get('/', async (req, res, next) => {
    try {
        res.render('home', { pageTitle: '' });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// Route for rendering handlebars view (dashboard)
router.get('/dashboard', async (req, res, next) => {
    try {
        res.render('dashboard', { pageTitle: 'Dashboard' });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// Route for rendering log in page 
router.get('/login', async (req, res, next) => {
    try {
        res.render('login', { pageTitle: 'Login' });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// Route for rendering sign up page 
router.get('/signup', async (req, res, next) => {
    try {
        res.render('signup', { pageTitle: 'Sign Up' });
    } catch (error) {
        console.error(error);
        next(error);
    }
});



//get all blog posts
const blogpostData = [
    {
      id: 1,
      title: 'Sample Post 1',
      content: 'Lorem ipsum dolor sit amet...',
      dateCreated: '2023-01-01',
      username: 'User1',
      comments: ['Comment 1', 'Comment 2'],
    }
];

router.get('/', async (req, res) => {
    try {
      const blogpostData = await Post.findAll();
      res.render('home', {blogpostData: blogpostData });
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  


module.exports = router;