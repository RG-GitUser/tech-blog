// route handler for user sign up
app.post('api/user', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Validate input
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Please provide all required information.' });
      }
  
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists.' });
      }
  
      // Create a new user with hashed password
      const newUser = await User.create({ name, email, password: hashedPassword });
  
      // Create a session for the user
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
  
      // Respond with the new user or just a success message
      res.status(201).json({ user: newUser, message: 'User created successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });