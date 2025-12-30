const parseQuery = (req, res, next) => {
  const { page = '1', limit = '20', sort, order = 'asc' } = req.query;
  req.pagination = {
    page: Math.max(1, parseInt(page, 10)),
    limit: Math.min(100, Math.max(1, parseInt(limit, 10))),
    sort: sort || null,
    order: order === 'desc' ? 'desc' : 'asc',
  };
  next();
};

module.exports = parseQuery;
