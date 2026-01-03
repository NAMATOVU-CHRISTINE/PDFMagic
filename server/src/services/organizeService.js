const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');
const { generateUUID } = require('../utils/cryptoUtils');

const reorderPages = async (file, newOrder) => {
  const pdfBytes = await fs.readFile(file.path);
  const pdf = await PDFDocument.load(pdfBytes);
  const newPdf = await PDFDocument.create();
  
  const pages = await newPdf.copyPages(pdf, newOrder.map(i => i - 1));
  pages.forEach(page => newPdf.addPage(page));
  
  const outputPath = path.join('output', `reordered-${generateUUID()}.pdf`);
  await fs.writeFile(outputPath, await newPdf.save());
  return { path: outputPath, filename: 'reordered.pdf' };
};

module.exports = { reorderPages };
