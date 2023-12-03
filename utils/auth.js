const express = require('express');
const router = express.Router();

// Middleware function checking if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.loggedIn) {
    // User is authenticated, proceed to the next middleware or route handler
    next();
  } else {
    // User is not authenticated, redirect them to the login page
    res.redirect('/login');
  }
};

// Applying middleware to the router
router.get('/dashboard', isAuthenticated, (req, res) => {
  // Render the dashboard page
  res.render('dashboard');
});

// Export the router
module.exports = router;
