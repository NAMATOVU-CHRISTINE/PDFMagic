const signService = require('../services/signService');
const { AppError } = require('../utils/errorHandler');

const signPdf = async (req, res, next) => {
  try {
    if (!req.files || !req.files.file) throw new AppError('Please upload a PDF file', 400);
    const { x, y } = req.body;
    const result = await signService.addSignature(req.files.file[0], req.files.signature?.[0], { x, y });
    res.download(result.path, result.filename);
  } catch (error) {
    next(error);
  }
};

module.exports = { signPdf };
