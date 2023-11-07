const express = require('express');
const router = express.Router();

const docController = require('../../controllers/docController');
const storageMiddleware = require('../../middlewares/storageMiddleware');

// IMAGE :
router.route('/image/profile').post(docController.uploadProfileImage);

router.route('/image/banner').post(docController.uploadBannerImage);

router.route('/image/post').post(docController.uploadPostImage);

router.route('/image/post/:profileId').get(docController.getProfileImage);

router.route('/image/post/:postId').get(docController.getPostImage);

// DOCUMENT :
router.route('/document/profile').post(docController.uploadProfileDocument);

router.route('/document/post').post(docController.uploadPostDocument);

router
	.route('/document/profile/:profileId')
	.get(docController.getProfileDocumentation);

router.route('/document/post/:postId').get(docController.getPostDocumentation);

// ABOUT :

router
	.route('/about/profile')
	.post(docController.uploadProfileAbout)
	.patch(docController.changeProfileAbout);

router.route('/about/post').post(docController.uploadPostAbout);

router.route('/about/post/:postId').get(docController.getPostAbout);
router.route('/about/profile/:profileId').get(docController.getProfileAbout);

// LINKS :

router.route('/link/profile').post(docController.uploadProfileLink);

router.route('/link/post').post(docController.uploadPostLink);

router.route('/link/post/:postId').get(docController.getPostLink);

router.route('/link/profile/:profileId').get(docController.getProfileLink);

module.exports = router;

// storageMiddleware.uploadProfilePhoto
