const { getToken } = require("../utils");
const config = require("../config");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = getToken(req);
  if (!token) {
    return res.status(403).send(`You are not logged in`);
  }
  try {
    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send(`Invalid token`);
  }
  return next();
};

module.exports = {
  verifyToken,
};
