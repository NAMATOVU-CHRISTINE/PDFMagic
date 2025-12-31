const express = require('express');
const router = express.Router();
const multer = require('multer');
const { imageToPdf } = require('../controllers/imageController');

const upload = multer({ dest: 'uploads/' });

router.post('/to-pdf', upload.array('files', 50), imageToPdf);

module.exports = router;
