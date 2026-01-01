const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');
const { generateUUID } = require('../utils/cryptoUtils');

const addSignature = async (file, signatureFile, position) => {
  const pdfBytes = await fs.readFile(file.path);
  const pdf = await PDFDocument.load(pdfBytes);
  
  const outputPath = path.join('output', `signed-${generateUUID()}.pdf`);
  await fs.writeFile(outputPath, await pdf.save());
  return { path: outputPath, filename: 'signed.pdf' };
};

module.exports = { addSignature };
