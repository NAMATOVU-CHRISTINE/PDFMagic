const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');
const { generateUUID } = require('../utils/cryptoUtils');

const repairPdf = async (file) => {
  const pdfBytes = await fs.readFile(file.path);
  const pdf = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
  
  const outputPath = path.join('output', `repaired-${generateUUID()}.pdf`);
  await fs.writeFile(outputPath, await pdf.save());
  return { path: outputPath, filename: 'repaired.pdf' };
};

module.exports = { repairPdf };
