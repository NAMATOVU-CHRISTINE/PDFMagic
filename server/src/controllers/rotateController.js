const rotateService = require('../services/rotateService');
const { AppError } = require('../utils/errorHandler');

const rotatePdf = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError('Please upload a PDF file', 400);
    }
    const { rotation } = req.body;
    const result = await rotateService.rotatePdf(req.file, rotation || '90');
    res.download(result.path, result.filename);
  } catch (error) {
    next(error);
  }
};

module.exports = { rotatePdf };
