const express = require('express');
const router = express.Router();
const multer = require('multer');
const { convertPdf } = require('../controllers/convertController');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), convertPdf);

module.exports = router;
