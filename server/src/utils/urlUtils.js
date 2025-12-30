const url = require('url');

const parseUrl = (urlString) => new URL(urlString);

const buildUrl = (base, path, params = {}) => {
  const urlObj = new URL(path, base);
  Object.entries(params).forEach(([key, value]) => {
    urlObj.searchParams.set(key, value);
  });
  return urlObj.toString();
};

const getQueryParams = (urlString) => {
  const urlObj = new URL(urlString);
  return Object.fromEntries(urlObj.searchParams);
};

module.exports = { parseUrl, buildUrl, getQueryParams };
