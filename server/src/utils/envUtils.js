const getEnv = (key, defaultValue = '') => process.env[key] || defaultValue;

const getEnvNumber = (key, defaultValue = 0) => {
  const value = process.env[key];
  return value ? parseInt(value, 10) : defaultValue;
};

const getEnvBool = (key, defaultValue = false) => {
  const value = process.env[key];
  return value ? value.toLowerCase() === 'true' : defaultValue;
};

module.exports = { getEnv, getEnvNumber, getEnvBool };
