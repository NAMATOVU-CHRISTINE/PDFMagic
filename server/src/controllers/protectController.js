const protectService = require('../services/protectService');
const { AppError } = require('../utils/errorHandler');

const protectPdf = async (req, res, next) => {
  try {
    if (!req.file) throw new AppError('Please upload a PDF file', 400);
    const { password } = req.body;
    if (!password) throw new AppError('Please provide a password', 400);
    const result = await protectService.protectPdf(req.file, password);
    res.download(result.path, result.filename);
  } catch (error) {
    next(error);
  }
};

const unlockPdf = async (req, res, next) => {
  try {
    if (!req.file) throw new AppError('Please upload a PDF file', 400);
    const { password } = req.body;
    if (!password) throw new AppError('Please provide a password', 400);
    const result = await protectService.unlockPdf(req.file, password);
    res.download(result.path, result.filename);
  } catch (error) {
    next(error);
  }
};

module.exports = { protectPdf, unlockPdf };
