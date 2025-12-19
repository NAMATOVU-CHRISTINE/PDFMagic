import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';
import { logger } from '../utils/logger.js';

export class PDFService {
  async mergePDFs(filePaths) {
    try {
      logger.info(`Merging ${filePaths.length} PDF files`);
      const mergedPdf = await PDFDocument.create();
      
      for (const filePath of filePaths) {
        const pdfBytes = await fs.readFile(filePath);
        const pdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      logger.success(`Successfully merged ${filePaths.length} PDFs`);
      return pdfBytes;
    } catch (error) {
      logger.error('PDF merge failed', { error: error.message });
      throw error;
    }
  }

  async splitPDF(filePath) {
    try {
      logger.info(`Splitting PDF: ${filePath}`);
      const pdfBytes = await fs.readFile(filePath);
      const pdf = await PDFDocument.load(pdfBytes);
      const pageCount = pdf.getPageCount();
      
      const splitPdfs = [];
      
      for (let i = 0; i < pageCount; i++) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdf, [i]);
        newPdf.addPage(copiedPage);
        
        const newPdfBytes = await newPdf.save();
        splitPdfs.push(newPdfBytes);
      }

      logger.success(`Successfully split PDF into ${pageCount} pages`);
      return splitPdfs;
    } catch (error) {
      logger.error('PDF split failed', { error: error.message });
      throw error;
    }
  }

  async compressPDF(filePath) {
    try {
      logger.info(`Compressing PDF: ${filePath}`);
      const pdfBytes = await fs.readFile(filePath);
      const pdf = await PDFDocument.load(pdfBytes);
      
      // Basic compression by re-saving with optimizations
      const compressedBytes = await pdf.save({
        useObjectStreams: false,
        addDefaultPage: false
      });

      const originalSize = pdfBytes.length;
      const compressedSize = compressedBytes.length;
      const compressionRatio = ((1 - compressedSize / originalSize) * 100).toFixed(2);

      logger.success(`PDF compressed by ${compressionRatio}%`);
      return compressedBytes;
    } catch (error) {
      logger.error('PDF compression failed', { error: error.message });
      throw error;
    }
  }

  async rotatePDF(filePath, rotation = 90) {
    try {
      logger.info(`Rotating PDF by ${rotation} degrees`);
      const pdfBytes = await fs.readFile(filePath);
      const pdf = await PDFDocument.load(pdfBytes);
      
      const pages = pdf.getPages();
      pages.forEach(page => {
        page.setRotation({ angle: rotation });
      });

      const rotatedBytes = await pdf.save();
      logger.success(`Successfully rotated PDF`);
      return rotatedBytes;
    } catch (error) {
      logger.error('PDF rotation failed', { error: error.message });
      throw error;
    }
  }

  async getPDFInfo(filePath) {
    try {
      const pdfBytes = await fs.readFile(filePath);
      const pdf = await PDFDocument.load(pdfBytes);
      
      return {
        pageCount: pdf.getPageCount(),
        title: pdf.getTitle() || 'Untitled',
        author: pdf.getAuthor() || 'Unknown',
        subject: pdf.getSubject() || '',
        creator: pdf.getCreator() || '',
        producer: pdf.getProducer() || '',
        creationDate: pdf.getCreationDate(),
        modificationDate: pdf.getModificationDate()
      };
    } catch (error) {
      logger.error('Failed to get PDF info', { error: error.message });
      throw error;
    }
  }
}

export const pdfService = new PDFService();