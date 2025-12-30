const timeout = (ms = 30000) => (req, res, next) => {
  res.setTimeout(ms, () => {
    res.status(408).json({ error: 'Request timeout' });
  });
  next();
};

module.exports = timeout;
