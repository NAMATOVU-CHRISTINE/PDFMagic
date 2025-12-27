const path = require('path');
const fs = require('fs');

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  return dirPath;
};

const getExtension = (filename) => {
  return path.extname(filename).toLowerCase().slice(1);
};

const getBasename = (filename) => {
  return path.basename(filename, path.extname(filename));
};

const joinPaths = (...paths) => {
  return path.join(...paths);
};

module.exports = {
  ensureDir,
  getExtension,
  getBasename,
  joinPaths,
};
