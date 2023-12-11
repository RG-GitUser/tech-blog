// authRoutes.js

const express = require('express');
const authenticate = require('./authMiddleware');

const router = express.Router();

// Your authentication routes go here

// Example route using the authenticate middleware
router.get('/dashboard', authenticate, (req, res) => {
  // You can access req.auth.isAuthenticated here
  if (req.auth.isAuthenticated) {
    res.render('dashboard');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
