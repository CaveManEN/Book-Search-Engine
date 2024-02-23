const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) { // Update function signature to accept an object with `req`
    // allows token to be sent via headers
    let token = req.headers.authorization;

    if (!token) {
      return { req }; // If no token, return the request object as is
    }

    // Check if token is in the format "Bearer <token>"
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length); // Remove "Bearer " from token string
    }

    if (!token) {
      return { req }; // If still no token, return the request object as is
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data; // Attach user data to the request object
    } catch (error) {
      console.log('Invalid token');
    }

    return { req }; // Return the modified request object
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
