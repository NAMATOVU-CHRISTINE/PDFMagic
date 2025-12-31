const express = require('express');
const router = express.Router();

const pdfRoutes = require('./pdf');
const convertRoutes = require('./convert');
const protectRoutes = require('./protect');
const pagesRoutes = require('./pages');
const rotateRoutes = require('./rotate');
const watermarkRoutes = require('./watermark');
const healthRoutes = require('./health');

router.use('/pdf', pdfRoutes);
router.use('/convert', convertRoutes);
router.use('/security', protectRoutes);
router.use('/pages', pagesRoutes);
router.use('/rotate', rotateRoutes);
router.use('/watermark', watermarkRoutes);
router.use('/health', healthRoutes);

module.exports = router;
