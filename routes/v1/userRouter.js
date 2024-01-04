const express = require('express');
const router = express.Router();

const userController = require('./../../controllers/userController');
const userMiddleware = require('./../../middlewares/userMiddleware');
const tokenMiddleware = require('./../../middlewares/tokenMiddleware');
const otpMiddleware = require('./../../middlewares/otpMiddleware');

// REGISTER :

router.route('/register').post(userController.registerUser);

router
	.route('/register/sendOtp')
	.post(
		userMiddleware.isUserEmailIdExist,
		otpMiddleware.generateOtpToken,
		userController.sendOTP
	);

router.route('/register/verifyOtp').post(userController.verifyOTP);

router.route('/register/sendMail').post(userController.sendRegisteredMail);

// LOGIN :

router
	.route('/login')
	.post(
		userMiddleware.isUserNameExist,
		userMiddleware.isUserSigned,
		userController.loginUser
	);

// FORGET PASSWORD :

router
	.route('/forgetPassword/sendOtp')
	.post(
		userMiddleware.isUserEmailIdExist,
		otpMiddleware.generateOtpToken,
		userController.sendOTP
	);

router.route('/forgetPassword/verifyOtp').post(userController.verifyOTP);

router
	.route('/forgetPassword')
	.post(
		userMiddleware.isUserEmailIdExist,
		otpMiddleware.removeOtpToken,
		userController.resetPassword
	);

// tokenMiddleware.protectedRoute,
// 	userMiddleware.isUserIdExist,

// FOLLOW USER :

router.route('/follow').post(userController.followUser);

module.exports = router;
