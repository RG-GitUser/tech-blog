//Middleware function checking if the user is auth
const isAuthenticated = (req, res, next) => {
    if (req.session.loggedIn) {
      // User is authenticated, proceed to the next middleware or route handler
      next();
    } else {
      // User is not authenticated, redirect them to the login page
      res.redirect('/login');
    }
  };

  //Applying middleware route
  app.get('/dashboard', isAuthenticated, (req, res) => {
    // Render the dashboard page
    res.render('dashboard');
  });