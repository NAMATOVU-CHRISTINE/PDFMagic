const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');
const { generateUUID } = require('../utils/cryptoUtils');

const merge = async (files) => {
  const mergedPdf = await PDFDocument.create();
  
  for (const file of files) {
    const pdfBytes = await fs.readFile(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach(page => mergedPdf.addPage(page));
  }
  
  const outputPath = path.join('output', `merged-${generateUUID()}.pdf`);
  const mergedBytes = await mergedPdf.save();
  await fs.writeFile(outputPath, mergedBytes);
  
  return { path: outputPath, filename: 'merged.pdf' };
};

const split = async (file, pageRanges) => {
  const pdfBytes = await fs.readFile(file.path);
  const pdf = await PDFDocument.load(pdfBytes);
  const newPdf = await PDFDocument.create();
  
  const ranges = pageRanges.split(',').map(r => r.trim());
  for (const range of ranges) {
    const [start, end] = range.split('-').map(Number);
    const pages = await newPdf.copyPages(pdf, Array.from({ length: (end || start) - start + 1 }, (_, i) => start - 1 + i));
    pages.forEach(page => newPdf.addPage(page));
  }
  
  const outputPath = path.join('output', `split-${generateUUID()}.pdf`);
  await fs.writeFile(outputPath, await newPdf.save());
  
  return { path: outputPath, filename: 'split.pdf' };
};

const compress = async (file, quality = 'medium') => {
  const outputPath = path.join('output', `compressed-${generateUUID()}.pdf`);
  await fs.copyFile(file.path, outputPath);
  return { path: outputPath, filename: 'compressed.pdf' };
};

module.exports = { merge, split, compress };
