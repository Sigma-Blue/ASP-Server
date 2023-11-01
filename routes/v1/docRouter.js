const express = require('express');
const router = express.Router();

const docController = require('../../controllers/docController');
const storageMiddleware = require('../../middlewares/storageMiddleware');
const multerStorage = require('../../services/multerStorage');

router
	.route('/image/profile')
	.post(
		storageMiddleware.uploadProfilePhoto,
		storageMiddleware.resizeProfilePhoto,
		docController.uploadProfilePhoto
	);

router
	.route('/image/banner')
	.post(
		storageMiddleware.uploadBannerPhoto,
		storageMiddleware.resizeBannerPhoto,
		docController.uploadBannerPhoto
	);

router
	.route('/image/post')
	.post(
		storageMiddleware.uploadPostPhotos,
		storageMiddleware.resizePostPhotos,
		docController.uploadPostPhotos
	);

module.exports = router;

// storageMiddleware.uploadProfilePhoto
