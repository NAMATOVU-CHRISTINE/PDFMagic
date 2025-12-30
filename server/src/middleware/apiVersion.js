const apiVersion = (version = 'v1') => (req, res, next) => {
  req.apiVersion = version;
  res.setHeader('X-API-Version', version);
  next();
};

module.exports = apiVersion;
