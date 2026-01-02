const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getMetadata } = require('../controllers/metadataController');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), getMetadata);

module.exports = router;
