const jwt = require('jsonwebtoken');

const { TOKEN_KEY } = process.env;

const verificationToken = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send('An authentication token is required');
  }

  try {
    const decodedToken = await jwt.verify(token, TOKEN_KEY);
    req.currentUser = decodedToken;
  } catch (error) {
    return res.status(401).send('Invalid Token provided');
  }

  return next();
};

module.exports = verificationToken;
