const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  // For example, you can validate a token.

  const authToken = req.headers.authorization;

  if (!authToken) {
    // If no token is provided, user is not authenticated
    req.auth = { isAuthenticated: false };
    return next();
  }

  const secretKey = 'SECRET-TECH';

  // Verify the token using jsonwebtoken
  jwt.verify(authToken, secretKey, (err, decoded) => {
    if (err) {
      // If token fails, user is not authenticated
      req.auth = { isAuthenticated: false };
    } else {
      // If token is valid, set isAuthenticated to true and attach user data
      req.auth = { isAuthenticated: true, user: decoded.user };
    }

  
    next();
  });
};

module.exports = authenticate;

