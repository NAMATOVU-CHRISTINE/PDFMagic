const metadataService = require('../services/metadataService');
const { AppError } = require('../utils/errorHandler');

const getMetadata = async (req, res, next) => {
  try {
    if (!req.file) throw new AppError('Please upload a PDF file', 400);
    const metadata = await metadataService.getMetadata(req.file);
    res.json(metadata);
  } catch (error) {
    next(error);
  }
};

module.exports = { getMetadata };
