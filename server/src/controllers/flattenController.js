const flattenService = require('../services/flattenService');
const { AppError } = require('../utils/errorHandler');

const flattenPdf = async (req, res, next) => {
  try {
    if (!req.file) throw new AppError('Please upload a PDF file', 400);
    const result = await flattenService.flattenPdf(req.file);
    res.download(result.path, result.filename);
  } catch (error) {
    next(error);
  }
};

module.exports = { flattenPdf };
