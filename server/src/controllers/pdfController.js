const path = require('path');
const pdfService = require('../services/pdfService');
const { AppError } = require('../utils/errorHandler');

const mergePdfs = async (req, res, next) => {
  try {
    if (!req.files || req.files.length < 2) {
      throw new AppError('Please upload at least 2 PDF files', 400);
    }
    const result = await pdfService.merge(req.files);
    res.download(result.path, result.filename);
  } catch (error) {
    next(error);
  }
};

const splitPdf = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError('Please upload a PDF file', 400);
    }
    const { pages } = req.body;
    const result = await pdfService.split(req.file, pages);
    res.download(result.path, result.filename);
  } catch (error) {
    next(error);
  }
};

const compressPdf = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError('Please upload a PDF file', 400);
    }
    const { quality } = req.body;
    const result = await pdfService.compress(req.file, quality);
    res.download(result.path, result.filename);
  } catch (error) {
    next(error);
  }
};

module.exports = { mergePdfs, splitPdf, compressPdf };
