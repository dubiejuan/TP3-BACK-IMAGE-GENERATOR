const express = require('express');
const { getImagesController, generateImageController, variantImageController, saveImageController } = require('../controllers/image/imageController');

const router = express.Router();
router.get('/', getImagesController);
router.post('/generate', generateImageController);
router.post('/variant', variantImageController);
router.post('/', saveImageController);

module.exports = router;