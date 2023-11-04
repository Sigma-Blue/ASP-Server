const express = require('express');
const router = express.Router();

const docController = require('../../controllers/docController');
const storageMiddleware = require('../../middlewares/storageMiddleware');

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

router
	.route('/about/profile')
	.post(docController.uploadProfileAbout)
	.patch(docController.changeProfileAbout);

router.route('/about/post').post(docController.uploadPostAbout);

router.route('/about/post/:postId').get(docController.getPostAbout);
router.route('/about/profile/:profileId').get(docController.getProfileAbout);

module.exports = router;

// storageMiddleware.uploadProfilePhoto
