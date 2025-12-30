const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const isValidRegex = (pattern) => {
  try {
    new RegExp(pattern);
    return true;
  } catch {
    return false;
  }
};

module.exports = { escapeRegex, isValidRegex };
