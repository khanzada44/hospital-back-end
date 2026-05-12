const jwt = require("jsonwebtoken");
const env = require("../../config/env");


const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.user_uuid,
      role: user.role,
      email: user.email
    },
    env.jwt.secret,
    {
      expiresIn: env.jwt.expiresIn
    }
  );
};


const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.user_uuid
    },
    env.jwt.refreshSecret,
    {
      expiresIn: env.jwt.refreshExpiresIn
    }
  );
};

module.exports = { generateAccessToken, generateRefreshToken };