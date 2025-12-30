const methodOverride = (req, res, next) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    req.method = req.body._method.toUpperCase();
    delete req.body._method;
  }
  next();
};

module.exports = methodOverride;
