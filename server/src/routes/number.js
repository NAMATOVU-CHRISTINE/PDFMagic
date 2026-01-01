const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addPageNumbers } = require('../controllers/numberController');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), addPageNumbers);

module.exports = router;
