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

	console.log(createdUser);
	return res.status(201).json({
		status: 'Success',
		message: `Successfully Saved the User details : ${userName}`,
	});
};

//	@route	POST	/login
//	@desc		Login Existing User
//	@body		userName,password

exports.loginUser = async (req, res) => {
	const { userName, password } = req.body;

	const { result: selectedUser, error: selectedErr } =
		await userModel.selectUserInfoByUserName(userName);

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

//	@route	GET	/resetPassword/:userName
//	@desc		Send Registered Mail to the user mail
//	@body		password,id,emailId

exports.sendRegisteredMail = async (req, res) => {
	const userName = req.params.userName;

	const { result: selectedUser, error: selectedErr } =
		await userModel.selectUserInfoByUserName(userName);

	if (selectedErr) {
		return res.status(500).json({
			status: 'Failure: SelectedErr ',
			message: `Internal Server Error : ${selectedErr}`,
		});
	}

	const { result: registeredMail, error: registeredErr } =
		emailUtil.registrationMailer(selectedUser.emailId, userName);

	if (registeredErr) {
		return res.status(500).json({
			status: 'Failure: registeredMail',
			message: `Internal Server Error : ${registeredErr}`,
		});
	}

	return res.status(200).json({
		status: 'Success ',
		message: `Send mail to the registered user`,
	});
};

//	@route	GET	/resetPassword/:userName
//	@desc		Send OTP to the user mail
//	@body		password,id,emailId

exports.sendOTP = async (req, res) => {
	const otpToken = req.body.otpToken;

	let userName = req.params.userName;
	let emailId = req.body.email;

	if (!userName) {
		userName = req.body.userName;
	}
	if (!emailId) {
		emailId = req.params.email;
	}

	console.log(emailId);

	const { result: resetPasswordMail, error: resetPasswordErr } =
		emailUtil.resetPasswordMailer(emailId, userName, otpToken);

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
	let userName = req.params.userName;

	const otpToken = req.body.otpToken;

	if (!userName) {
		email = req.params.email;
		const { result: selectedEmail, error: selectedErr } =
			await userModel.selectUserInfoByEmailId(email);

		userName = selectedEmail.userName;
	}

	console.log(userName);

	const { result: selectedOtpToken, error: selectedErr } =
		await userModel.selectPasswordResetInfoByToken(otpToken);

	if (selectedErr) {
		return res.status(500).json({
			status: 'Failure: SelectedErr ',
			message: `Internal Server Error : ${selectedErr}`,
		});
	}

	console.log(selectedOtpToken);
	if (!selectedOtpToken) {
		return res.status(404).json({
			status: 'Failure: SelectedOtpToken',
			message: `OTP Token: ${otpToken} does not exist`,
		});
	}

	if (selectedOtpToken.expiresIn < new Date().toISOString()) {
		return res.status(403).json({
			status: 'Failure: SelectedOtpToken expiresIn ',
			message: `Forbidden response : OTP Token Expired `,
		});
	}

	const { result: updatedIsVerified, error: updatedErr } =
		await userModel.updateIsVerifiedByUserName(userName);

	if (updatedErr) {
		return res.status(500).json({
			status: 'Failure: updatedErr ',
			message: `Internal Server Error : ${updatedErr}`,
		});
	}

	return res.status(200).json({
		status: 'Success ',
		message: `OTP Token entered is correct`,
	});
};
