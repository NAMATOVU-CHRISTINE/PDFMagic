const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');
const { generateUUID } = require('../utils/cryptoUtils');

const addPageNumbers = async (file, position = 'bottom') => {
  const pdfBytes = await fs.readFile(file.path);
  const pdf = await PDFDocument.load(pdfBytes);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const pages = pdf.getPages();

  pages.forEach((page, index) => {
    const { width, height } = page.getSize();
    const text = `${index + 1}`;
    const y = position === 'bottom' ? 30 : height - 30;
    page.drawText(text, { x: width / 2, y, size: 12, font, color: rgb(0, 0, 0) });
  });

  const outputPath = path.join('output', `numbered-${generateUUID()}.pdf`);
  await fs.writeFile(outputPath, await pdf.save());
  return { path: outputPath, filename: 'numbered.pdf' };
};

module.exports = { addPageNumbers };
