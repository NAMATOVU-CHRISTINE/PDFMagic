const convertService = require('../services/convertService');
const { AppError } = require('../utils/errorHandler');

const convertPdf = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError('Please upload a PDF file', 400);
    }
    const { format } = req.body;
    let result;
    
    if (format === 'docx') {
      result = await convertService.convertToWord(req.file);
    } else {
      result = await convertService.convertToImage(req.file, format);
    }
    
    res.download(result.path, result.filename);
  } catch (error) {
    next(error);
  }
};

module.exports = { convertPdf };
