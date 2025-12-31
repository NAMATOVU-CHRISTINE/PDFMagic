const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protectPdf, unlockPdf } = require('../controllers/protectController');

const upload = multer({ dest: 'uploads/' });

router.post('/protect', upload.single('file'), protectPdf);
router.post('/unlock', upload.single('file'), unlockPdf);

module.exports = router;
