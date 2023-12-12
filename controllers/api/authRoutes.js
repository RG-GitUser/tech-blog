// authRoutes.js

const express = require('express');
const authenticate = require('./authMiddleware');

const router = express.Router();

//authenticating where applicable 

router.get('/dashboard', authenticate, (req, res) => {
  if (req.auth.isAuthenticated) {
    res.render('dashboard');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
