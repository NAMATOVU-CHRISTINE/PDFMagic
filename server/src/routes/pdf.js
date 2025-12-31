const express = require('express');
const router = express.Router();
const multer = require('multer');
const { mergePdfs, splitPdf, compressPdf } = require('../controllers/pdfController');

const upload = multer({ dest: 'uploads/' });

router.post('/merge', upload.array('files', 20), mergePdfs);
router.post('/split', upload.single('file'), splitPdf);
router.post('/compress', upload.single('file'), compressPdf);

module.exports = router;
