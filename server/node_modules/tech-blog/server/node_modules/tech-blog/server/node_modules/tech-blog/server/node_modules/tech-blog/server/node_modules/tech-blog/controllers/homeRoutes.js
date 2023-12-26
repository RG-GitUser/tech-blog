const path = require('path');
const fs = require('fs');
const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Route for rendering handlebars view (homepage)
router.get('/', async (req, res) => {
  try {
    // Get all Posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('home', { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for rendering handlebars view (dashboard)
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    res.render('dashboard', { pageTitle: 'Dashboard', logged_in: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Route for rendering log in page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the dashboard
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login', { pageTitle: 'Login' });
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

// Route for rendering individual post details
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', { ...post, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;