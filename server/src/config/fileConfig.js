const path = require('path');

const fileConfig = {
  uploadDir: path.join(process.cwd(), 'uploads'),
  tempDir: path.join(process.cwd(), 'temp'),
  outputDir: path.join(process.cwd(), 'output'),
  maxFileAge: 24 * 60 * 60 * 1000,
};

module.exports = fileConfig;
