const pagination = (defaultLimit = 20, maxLimit = 100) => (req, res, next) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(maxLimit, Math.max(1, parseInt(req.query.limit) || defaultLimit));
  const skip = (page - 1) * limit;

  req.pagination = { page, limit, skip };
  next();
};

module.exports = pagination;
