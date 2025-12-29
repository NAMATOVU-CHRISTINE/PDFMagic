const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

const mergeDeep = (target, source) => {
  const output = { ...target };
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      output[key] = mergeDeep(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  }
  return output;
};

const isEmpty = (obj) => Object.keys(obj).length === 0;

module.exports = { deepClone, mergeDeep, isEmpty };
