const { User } = require('../../models');
const router = require('express').Router()


// create new user record in db
router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
//code for error messages and save successful session 
  router.post('/login', async (req, res) => { 
    console.log('req.body = ', req.body)
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

  
// logout 
app.post('/logout', (req, res) => {
  // Clear the user-related session data
  req.session.isAuthenticated = false;

  // Render the logout template
  res.render('logout', { isAuthenticated: req.session.isAuthenticated });
});





  
  
  module.exports = router;
  
  
  