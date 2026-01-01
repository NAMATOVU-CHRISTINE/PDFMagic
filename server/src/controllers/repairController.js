const repairService = require('../services/repairService');
const { AppError } = require('../utils/errorHandler');

const repairPdf = async (req, res, next) => {
  try {
    if (!req.file) throw new AppError('Please upload a PDF file', 400);
    const result = await repairService.repairPdf(req.file);
    res.download(result.path, result.filename);
  } catch (error) {
    next(error);
  }
};

module.exports = { repairPdf };
