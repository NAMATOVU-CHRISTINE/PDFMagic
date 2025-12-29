const loggerConfig = {
  level: process.env.LOG_LEVEL || 'info',
  format: 'json',
  timestamp: true,
  colorize: process.env.NODE_ENV === 'development',
  maxFiles: 5,
  maxSize: '10m',
};

module.exports = loggerConfig;
