const numberService = require('../services/numberService');
const { AppError } = require('../utils/errorHandler');

const addPageNumbers = async (req, res, next) => {
  try {
    if (!req.file) throw new AppError('Please upload a PDF file', 400);
    const { position } = req.body;
    const result = await numberService.addPageNumbers(req.file, position);
    res.download(result.path, result.filename);
  } catch (error) {
    next(error);
  }
};

module.exports = { addPageNumbers };
