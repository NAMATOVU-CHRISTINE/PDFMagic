const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');
const { generateUUID } = require('../utils/cryptoUtils');

const addWatermark = async (file, text) => {
  const pdfBytes = await fs.readFile(file.path);
  const pdf = await PDFDocument.load(pdfBytes);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const pages = pdf.getPages();
  
  pages.forEach(page => {
    const { width, height } = page.getSize();
    page.drawText(text, {
      x: width / 2 - 50,
      y: height / 2,
      size: 50,
      font,
      color: rgb(0.75, 0.75, 0.75),
      opacity: 0.3,
    });
  });
  
  const outputPath = path.join('output', `watermarked-${generateUUID()}.pdf`);
  await fs.writeFile(outputPath, await pdf.save());
  
  return { path: outputPath, filename: 'watermarked.pdf' };
};

module.exports = { addWatermark };
