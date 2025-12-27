const { AppError } = require('../utils/errorHandler');

const notFound = (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
};

module.exports = notFound;
