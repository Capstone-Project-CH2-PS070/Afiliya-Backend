const jwt = require('jsonwebtoken');

const { TOKEN_KEY, TOKEN_EXPIRY } = process.env;

const createToken = async (tokenData, tokenKey = TOKEN_KEY, expiresIn = TOKEN_EXPIRY) => {
  try {
    const token = await jwt.sign(tokenData, tokenKey, {
      expiresIn,
    });
    return token;
  } catch (error) {
    console.error('Error creating token:', error.message);
    throw error;
  }
};

module.exports = createToken;
