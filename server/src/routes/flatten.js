const express = require('express');
const router = express.Router();
const multer = require('multer');
const { flattenPdf } = require('../controllers/flattenController');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), flattenPdf);

module.exports = router;
