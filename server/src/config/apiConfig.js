const apiConfig = {
  version: 'v1',
  prefix: '/api',
  timeout: 30000,
  pagination: {
    defaultLimit: 20,
    maxLimit: 100,
  },
};

module.exports = apiConfig;
