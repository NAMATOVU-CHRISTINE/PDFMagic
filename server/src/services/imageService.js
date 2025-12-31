const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');
const { generateUUID } = require('../utils/cryptoUtils');

const imageToPdf = async (files) => {
  const pdf = await PDFDocument.create();
  
  for (const file of files) {
    const imageBytes = await fs.readFile(file.path);
    const image = file.mimetype.includes('png') 
      ? await pdf.embedPng(imageBytes)
      : await pdf.embedJpg(imageBytes);
    
    const page = pdf.addPage([image.width, image.height]);
    page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
  }
  
  const outputPath = path.join('output', `images-${generateUUID()}.pdf`);
  await fs.writeFile(outputPath, await pdf.save());
  return { path: outputPath, filename: 'converted.pdf' };
};

module.exports = { imageToPdf };
