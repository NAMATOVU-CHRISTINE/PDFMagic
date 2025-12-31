const express = require('express');
const router = express.Router();
const multer = require('multer');
const { rotatePdf } = require('../controllers/rotateController');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), rotatePdf);

module.exports = router;
