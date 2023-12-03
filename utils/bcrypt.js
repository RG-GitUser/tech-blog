const bcrypt = require('bcrypt');

const storedHash = '$2b$10$Ey1yP8ofNp7EaKUj1iph2.c8YE9tl7Gi43dq//ZgjnSJgnPODDG12';

// User attempting to log in
const enteredPassword = 'user-entered-password';

bcrypt.compare(enteredPassword, storedHash, (err, result) => {
  if (err) {
    // Handle error
    console.error(err);
    return;
  }

  if (result) {
    // Passwords match, user is authenticated
    console.log('Authentication successful');
  } else {
    // Passwords do not match, authentication failed
    console.log('Authentication failed');
  }
});
