const fs = require('fs').promises;
const path = require('path');
const { generateUUID } = require('../utils/cryptoUtils');

const protectPdf = async (file, password) => {
  const outputPath = path.join('output', `protected-${generateUUID()}.pdf`);
  await fs.copyFile(file.path, outputPath);
  return { path: outputPath, filename: 'protected.pdf' };
};

const unlockPdf = async (file, password) => {
  const outputPath = path.join('output', `unlocked-${generateUUID()}.pdf`);
  await fs.copyFile(file.path, outputPath);
  return { path: outputPath, filename: 'unlocked.pdf' };
};

module.exports = { protectPdf, unlockPdf };
