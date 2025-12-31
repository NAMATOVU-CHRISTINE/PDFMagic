const imageService = require('../services/imageService');
const { AppError } = require('../utils/errorHandler');

const imageToPdf = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      throw new AppError('Please upload at least one image', 400);
    }
    const result = await imageService.imageToPdf(req.files);
    res.download(result.path, result.filename);
  } catch (error) {
    next(error);
  }
};

module.exports = { imageToPdf };
