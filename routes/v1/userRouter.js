const express = require('express');
const router = express.Router();

const userController = require('./../../controllers/userController');
const userMiddleware = require('./../../middlewares/userMiddleware');
const tokenMiddleware = require('./../../middlewares/tokenMiddleware');
const otpMiddleware = require('./../../middlewares/otpMiddleware');

router.route('/register').post(userController.registerUser);

router.route('/login').post(userController.loginUser);

router
	.route('/resetPassword/:userName')
	.get(
		userMiddleware.isUserNameExist,
		otpMiddleware.generateOtpToken,
		userController.sendOTP
	)
	.post(userController.verifyOTP)
	.patch(
		userMiddleware.isUserNameExist,
		otpMiddleware.removeOtpToken,
		userController.resetPassword
	);

// tokenMiddleware.protectedRoute,
// 	userMiddleware.isUserIdExist,

module.exports = router;
