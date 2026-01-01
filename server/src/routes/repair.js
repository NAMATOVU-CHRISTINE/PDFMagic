const express = require('express');
const router = express.Router();
const multer = require('multer');
const { repairPdf } = require('../controllers/repairController');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), repairPdf);

module.exports = router;
