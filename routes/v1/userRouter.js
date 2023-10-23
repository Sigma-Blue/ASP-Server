const express = require('express');
const router = express.Router();

const userController = require('./../../controllers/userController');
const userMiddleware = require('./../../middlewares/userMiddleware');

router.route('/register').post(userController.registerUser);

router.route('/login').post(userController.loginUser);

router
	.route('/resetPassword/:userName')
	.patch(userMiddleware.isUserExist, userController.resetPassword);

module.exports = router;
