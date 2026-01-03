const express = require('express');
const router = express.Router();
const multer = require('multer');
const { reorderPages } = require('../controllers/organizeController');

const upload = multer({ dest: 'uploads/' });

router.post('/reorder', upload.single('file'), reorderPages);

module.exports = router;
