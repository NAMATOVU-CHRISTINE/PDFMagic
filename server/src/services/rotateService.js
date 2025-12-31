const { PDFDocument, degrees } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');
const { generateUUID } = require('../utils/cryptoUtils');

const rotatePdf = async (file, rotation) => {
  const pdfBytes = await fs.readFile(file.path);
  const pdf = await PDFDocument.load(pdfBytes);
  const pages = pdf.getPages();
  
  pages.forEach(page => {
    page.setRotation(degrees(parseInt(rotation)));
  });
  
  const outputPath = path.join('output', `rotated-${generateUUID()}.pdf`);
  await fs.writeFile(outputPath, await pdf.save());
  
  return { path: outputPath, filename: 'rotated.pdf' };
};

module.exports = { rotatePdf };
