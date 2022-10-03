const logger = require("./logger");
const jwt = require("jsonwebtoken");
const config = require("./config");
const User = require("../models/user");

const errorHandler = (err, req, res, next) => {
  logger.error(err.name);
  next(err);
};

const tokenExtractor = (req, res, next) => {
  const auth = req.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    req.token = auth.substring(7);
    console.log("found token: ", req.token);
  } else {
    console.log("token not found");
  }
  next();
};

const userExtractor = async (req, res, next) => {
  if (req.token === undefined) {
    console.log("user not extracted");
    return next();
  }
  const decodedToken = await jwt.verify(req.token, config.SECRET);
  const user = await User.findById(decodedToken.id);
  if (user == null) {
    return res.status(401).json({ error: "user not found" });
  }
  console.log("user extracted", user);
  req.user = user;

  next();
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
