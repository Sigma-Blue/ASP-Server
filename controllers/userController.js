const userModel = require('./../models/userModel');
const hashUserPassword = require('../services/hashUserPassword');
const emailUtil = require('../utils/emailUtil');
const jwtTokenAuthorization = require('./../services/jwtTokenAuthorization');

//	@route	POST	/register
//	@desc		Register New User
//	@body		userName,email,password

exports.registerUser = async (req, res) => {
	const { userName, email, password } = req.body;

	const { result: selectedUser, error: selectedErr } =
		await userModel.selectUserInfoByEmailId(email);

	if (selectedErr) {
		return res.status(500).json({
			status: 'Failure: SelectedErr ',
			message: `Internal Server Error : ${selectedErr}`,
		});
	}

	if (selectedUser) {
		return res.status(400).json({
			status: 'Failure: SelectedUser',
			message: 'User already exists',
		});
	}

	const passwordHashed = hashUserPassword.hashPassword(password);

	const { result: createdUser, error: createdErr } = await userModel.createUser(
		userName,
		email,
		passwordHashed
	);

	if (createdErr) {
		return res.status(500).json({
			status: 'Failure: CreatedErr',
			message: `Internal Server Error : ${createdErr}`,
		});
	}

	const { result: registeredMail, error: registeredErr } =
		emailUtil.registrationMailer(email, userName);

	if (registeredErr) {
		return res.status(500).json({
			status: 'Failure: registeredMail',
			message: `Internal Server Error : ${registeredErr}`,
		});
	}

	const token = jwtTokenAuthorization.createToken(
		createdUser.id,
		userName,
		email
	);

	console.log(createdUser);
	return res.status(201).json({
		status: 'Success',
		token,
		message: `Successfully Registered the User : ${userName}`,
	});
};

//	@route	POST	/login
//	@desc		Login Existing User
//	@body		userName,password

exports.loginUser = async (req, res) => {
	const { userName, password } = req.body;

	const { result: selectedUser, error: selectedErr } =
		await userModel.selectUserInfoByUserName(userName);

	if (selectedErr) {
		return res.status(500).json({
			status: 'Failure: SelectedErr ',
			message: `Internal Server Error : ${selectedErr}`,
		});
	}

	if (!selectedUser) {
		return res.status(404).json({
			status: 'Failure: SelectedUser',
			message: `User: ${userName} does not exist`,
		});
	}

	const isMatch = hashUserPassword.verifyPassword(
		password,
		selectedUser.passwordHashed
	);

	if (!isMatch) {
		return res.status(401).json({
			status: 'Failure: isMatch',
			message: `User: ${userName} unauthorized `,
		});
	}

	const token = jwtTokenAuthorization.createToken(
		selectedUser.id,
		userName,
		selectedUser.emailId
	);

	return res.status(200).json({
		status: 'Success ',
		token,
		message: `User : ${userName} authorized to login`,
	});
};

//	@route	PATCH	/resetPassword/:userName
//	@desc		Reset the Password of Existing User by given userName
//	@body		password,id,emailId

exports.resetPassword = async (req, res) => {
	const { id, password } = req.body;

	// get email of the user and send otp

	const passwordHashed = hashUserPassword.hashPassword(password);

	const { result: updatedUser, error: updatedErr } =
		await userModel.updatePasswordById(id, passwordHashed);

	if (updatedErr) {
		return res.status(500).json({
			status: 'Failure: SelectedErr ',
			message: `Internal Server Error : ${updatedErr}`,
		});
	}

	console.log(updatedUser);
	return res.status(200).json({
		status: 'Success ',
		message: `User : ${updatedUser.userName} Reset the Password`,
	});
};

OTP = 123;

//	@route	GET	/resetPassword/:userName
//	@desc		Send OTP to the user mail
//	@body		password,id,emailId

exports.sendOTP = async (req, res) => {
	const userName = req.params.userName;
	const { emailId } = req.body;

	const { result: resetPasswordMail, error: resetPasswordErr } =
		emailUtil.resetPasswordMailer(emailId, userName, OTP);

	if (resetPasswordErr) {
		return res.status(500).json({
			status: 'Failure: resetPasswordMail',
			message: `Internal Server Error : ${resetPasswordErr}`,
		});
	}

	return res.status(200).json({
		status: 'Success ',
		message: `OTP send to the user email`,
	});
};

//	@route	POST	/resetPassword/:userName
//	@desc		Verify the user entered OTP with the generated OTP
//	@body		otp

exports.verifyOTP = async (req, res) => {
	const { otp } = req.body;

	const isMatch = otp === global.OTP;

	if (!isMatch) {
		return res.status(401).json({
			status: 'Failure: isMatch',
			message: 'OTP entered is wrong ',
		});
	}

	return res.status(200).json({
		status: 'Success ',
		message: `OTP entered is correct`,
	});
};
