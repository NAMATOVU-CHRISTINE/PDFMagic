const responseTime = (req, res, next) => {
  const start = process.hrtime();
  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const ms = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);
    res.setHeader('X-Response-Time', `${ms}ms`);
  });
  next();
};

module.exports = responseTime;
