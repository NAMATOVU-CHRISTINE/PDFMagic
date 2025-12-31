const watermarkService = require('../services/watermarkService');
const { AppError } = require('../utils/errorHandler');

const addWatermark = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError('Please upload a PDF file', 400);
    }
    const { text } = req.body;
    if (!text) {
      throw new AppError('Please provide watermark text', 400);
    }
    const result = await watermarkService.addWatermark(req.file, text);
    res.download(result.path, result.filename);
  } catch (error) {
    next(error);
  }
};

module.exports = { addWatermark };
