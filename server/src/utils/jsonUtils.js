const safeJsonParse = (str, fallback = null) => {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
};

const safeJsonStringify = (obj, fallback = '{}') => {
  try {
    return JSON.stringify(obj);
  } catch {
    return fallback;
  }
};

module.exports = { safeJsonParse, safeJsonStringify };
