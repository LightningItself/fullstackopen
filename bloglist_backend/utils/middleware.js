const logger = require("./logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err.name);
  next(err);
};

module.exports = { errorHandler };
