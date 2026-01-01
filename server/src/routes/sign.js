const express = require('express');
const router = express.Router();
const multer = require('multer');
const { signPdf } = require('../controllers/signController');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.fields([{ name: 'file' }, { name: 'signature' }]), signPdf);

module.exports = router;
