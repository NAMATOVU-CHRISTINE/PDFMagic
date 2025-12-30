const cacheConfig = {
  defaultTTL: 60 * 1000,
  maxSize: 100,
  checkPeriod: 120 * 1000,
  useClones: false,
};

module.exports = cacheConfig;
