const cacheControl = (maxAge = 3600) => (req, res, next) => {
  res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
  next();
};

const noCache = (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  next();
};

module.exports = { cacheControl, noCache };
