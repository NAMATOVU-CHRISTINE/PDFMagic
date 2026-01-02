const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;

const getMetadata = async (file) => {
  const pdfBytes = await fs.readFile(file.path);
  const pdf = await PDFDocument.load(pdfBytes);
  
  return {
    title: pdf.getTitle() || '',
    author: pdf.getAuthor() || '',
    subject: pdf.getSubject() || '',
    creator: pdf.getCreator() || '',
    pageCount: pdf.getPageCount(),
  };
};

module.exports = { getMetadata };
