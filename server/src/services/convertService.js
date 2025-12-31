const fs = require('fs').promises;
const path = require('path');
const { generateUUID } = require('../utils/cryptoUtils');

const convertToImage = async (file, format = 'jpg') => {
  const outputPath = path.join('output', `converted-${generateUUID()}.${format}`);
  await fs.copyFile(file.path, outputPath);
  return { path: outputPath, filename: `converted.${format}` };
};

const convertToWord = async (file) => {
  const outputPath = path.join('output', `converted-${generateUUID()}.docx`);
  await fs.copyFile(file.path, outputPath);
  return { path: outputPath, filename: 'converted.docx' };
};

module.exports = { convertToImage, convertToWord };
