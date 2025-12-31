const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addWatermark } = require('../controllers/watermarkController');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), addWatermark);

module.exports = router;
