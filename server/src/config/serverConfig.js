const serverConfig = {
  host: process.env.HOST || '0.0.0.0',
  port: parseInt(process.env.PORT, 10) || 3000,
  trustProxy: true,
  keepAliveTimeout: 65000,
  headersTimeout: 66000,
};

module.exports = serverConfig;
