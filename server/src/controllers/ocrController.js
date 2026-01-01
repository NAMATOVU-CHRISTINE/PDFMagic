const ocrService = require('../services/ocrService');
const { AppError } = require('../utils/errorHandler');

const extractText = async (req, res, next) => {
  try {
    if (!req.file) throw new AppError('Please upload a PDF file', 400);
    const result = await ocrService.extractText(req.file);
    res.json({ text: result.text });
  } catch (error) {
    next(error);
  }
};

module.exports = { extractText };
