const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');
const { generateUUID } = require('../utils/cryptoUtils');

const extractPages = async (file, pageNumbers) => {
  const pdfBytes = await fs.readFile(file.path);
  const pdf = await PDFDocument.load(pdfBytes);
  const newPdf = await PDFDocument.create();
  
  const pages = await newPdf.copyPages(pdf, pageNumbers.map(n => n - 1));
  pages.forEach(page => newPdf.addPage(page));
  
  const outputPath = path.join('output', `extracted-${generateUUID()}.pdf`);
  await fs.writeFile(outputPath, await newPdf.save());
  return { path: outputPath, filename: 'extracted.pdf' };
};

const deletePages = async (file, pageNumbers) => {
  const pdfBytes = await fs.readFile(file.path);
  const pdf = await PDFDocument.load(pdfBytes);
  const totalPages = pdf.getPageCount();
  const keepPages = Array.from({ length: totalPages }, (_, i) => i).filter(i => !pageNumbers.includes(i + 1));
  
  const newPdf = await PDFDocument.create();
  const pages = await newPdf.copyPages(pdf, keepPages);
  pages.forEach(page => newPdf.addPage(page));
  
  const outputPath = path.join('output', `deleted-${generateUUID()}.pdf`);
  await fs.writeFile(outputPath, await newPdf.save());
  return { path: outputPath, filename: 'modified.pdf' };
};

module.exports = { extractPages, deletePages };
