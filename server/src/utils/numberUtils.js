const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const roundTo = (num, decimals) => {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
};

const percentage = (value, total) => (total === 0 ? 0 : (value / total) * 100);

module.exports = { clamp, randomInt, roundTo, percentage };
