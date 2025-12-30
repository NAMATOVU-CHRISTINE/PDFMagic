const ipFilter = (allowedIps = []) => (req, res, next) => {
  const clientIp = req.ip || req.connection.remoteAddress;
  if (allowedIps.length === 0 || allowedIps.includes(clientIp)) {
    next();
  } else {
    res.status(403).json({ error: 'Access denied' });
  }
};

module.exports = ipFilter;
