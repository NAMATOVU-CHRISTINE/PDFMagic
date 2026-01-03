const organizeService = require('../services/organizeService');
const { AppError } = require('../utils/errorHandler');

const reorderPages = async (req, res, next) => {
  try {
    if (!req.file) throw new AppError('Please upload a PDF file', 400);
    const { order } = req.body;
    const newOrder = JSON.parse(order);
    const result = await organizeService.reorderPages(req.file, newOrder);
    res.download(result.path, result.filename);
  } catch (error) {
    next(error);
  }
};

module.exports = { reorderPages };
