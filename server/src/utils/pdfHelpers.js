import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

/**
 * Load a PDF from file bytes
 */
export const loadPdf = async (pdfBytes) => {
  return await PDFDocument.load(pdfBytes);
};

/**
 * Create a new empty PDF document
 */
export const createPdf = async () => {
  return await PDFDocument.create();
};

/**
 * Get standard font
 */
export const getFont = async (pdf, fontName = StandardFonts.Helvetica) => {
  return await pdf.embedFont(fontName);
};

/**
 * Parse hex color to RGB
 */
export const hexToRgb = (hex) => {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
  return rgb(r, g, b);
};

/**
 * Get PDF metadata
 */
export const getPdfMetadata = (pdf) => {
  return {
    pageCount: pdf.getPageCount(),
    title: pdf.getTitle() || 'Untitled',
    author: pdf.getAuthor() || 'Unknown',
    subject: pdf.getSubject() || '',
    creator: pdf.getCreator() || '',
    producer: pdf.getProducer() || '',
  };
};

/**
 * Copy pages from one PDF to another
 */
export const copyPages = async (sourcePdf, targetPdf, pageIndices) => {
  const copiedPages = await targetPdf.copyPages(sourcePdf, pageIndices);
  copiedPages.forEach((page) => targetPdf.addPage(page));
  return copiedPages;
};
