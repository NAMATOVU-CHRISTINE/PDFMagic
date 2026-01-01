const express = require('express');
const router = express.Router();
const multer = require('multer');
const { extractText } = require('../controllers/ocrController');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), extractText);

module.exports = router;
