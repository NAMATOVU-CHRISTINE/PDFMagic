const express = require('express');
const router = express.Router();
const multer = require('multer');
const { extractPages, deletePages } = require('../controllers/pageController');

const upload = multer({ dest: 'uploads/' });

router.post('/extract', upload.single('file'), extractPages);
router.post('/delete', upload.single('file'), deletePages);

module.exports = router;
