const watermarkService = require('../services/watermarkService');
const { AppError } = require('../utils/errorHandler');

const addImageWatermark = async (req, res, next) => {
  try {
    if (!req.files || req.files.length < 2) {
      throw new AppError('Please upload PDF and watermark image', 400);
    }
    const result = await watermarkService.addImageWatermark(req.files[0], req.files[1]);
    res.download(result.path, result.filename);
  } catch (error) {
    next(error);
  }
};

module.exports = { addImageWatermark };
