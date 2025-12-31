const pageService = require('../services/pageService');
const { AppError } = require('../utils/errorHandler');

const parsePages = (str) => str.split(',').flatMap(p => {
  if (p.includes('-')) {
    const [start, end] = p.split('-').map(Number);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
  return [Number(p)];
});

const extractPages = async (req, res, next) => {
  try {
    if (!req.file) throw new AppError('Please upload a PDF file', 400);
    const pages = parsePages(req.body.pages);
    const result = await pageService.extractPages(req.file, pages);
    res.download(result.path, result.filename);
  } catch (error) {
    next(error);
  }
};

const deletePages = async (req, res, next) => {
  try {
    if (!req.file) throw new AppError('Please upload a PDF file', 400);
    const pages = parsePages(req.body.pages);
    const result = await pageService.deletePages(req.file, pages);
    res.download(result.path, result.filename);
  } catch (error) {
    next(error);
  }
};

module.exports = { extractPages, deletePages };
