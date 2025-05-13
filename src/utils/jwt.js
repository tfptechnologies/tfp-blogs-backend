const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.signToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, config.jwtSecret);
};
