const userModel = require('./../models/userModel');
const hashUserPassword = require('../services/hashUserPassword');
const emailUtil = require('../utils/emailUtil');
const jwtTokenAuthorization = require('./../services/jwtTokenAuthorization');

//	@route	POST	/register
//	@desc		Register New User
//	@body		userName,email,password

exports.registerUser = async (req, res) => {
	const { userName, email, password } = req.body;

	// Check whether user already exist

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

	// Create hashed password

	const passwordHashed = hashUserPassword.hashPassword(password);

	// Create new User

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

	// Select the respective User Password
	const { result: selectedPassword, error: selectedPasswordErr } =
		await userModel.selectUserPasswordByUserName(userName);

	// Select the respective User Info
	const { result: selectedUser, error: selectedUserErr } =
		await userModel.selectUserInfoByUserName(userName);

	if (selectedUserErr) {
		return res.status(500).json({
			status: 'Failure: selectedUserErr ',
			message: `Internal Server Error : ${selectedUserErr}`,
		});
	}

	if (selectedPasswordErr) {
		return res.status(500).json({
			status: 'Failure: selectedPasswordErr ',
			message: `Internal Server Error : ${selectedPasswordErr}`,
		});
	}
	// Check the authenticity of the Password entered

	const isMatch = hashUserPassword.verifyPassword(
		password,
		selectedPassword.passwordHashed
	);

	if (!isMatch) {
		return res.status(401).json({
			status: 'Failure: isMatch',
			message: `User: ${userName} unauthorized `,
		});
	}

	// Create and Send JWT Token

	const token = jwtTokenAuthorization.createToken(
		selectedUser.id,
		userName,
		selectedUser.emailId
	);

	return res.status(200).json({
		status: 'Success ',
		token,
		message: `User : ${userName} authorized to login`,
		data: { user: { ...selectedUser } },
	});
};

//	@route	PATCH	/resetPassword/:userName
//	@desc		Reset the Password of Existing User by given userName
//	@body		password,id,emailId

exports.resetPassword = async (req, res) => {
	const { id, password } = req.body;

	// Create and inset the hashed password from the user entered password
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

	// Select the email address of the respective user

	const { result: selectedUser, error: selectedErr } =
		await userModel.selectUserInfoByUserName(userName);

	if (selectedErr) {
		return res.status(500).json({
			status: 'Failure: SelectedErr ',
			message: `Internal Server Error : ${selectedErr}`,
		});
	}

	// Send the registration email to the user

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

	// Get the userName and emailId from the possible ways

	let userName = req.params.userName;
	let emailId = req.body.emailId;

	if (!userName) {
		userName = req.body.userName;
	}
	if (!emailId) {
		emailId = req.params.email;
	}

	// Send the OTP to the user email
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
	const otpToken = req.body.otpToken;

	// Get the userName and email of the user from possible ways
	let userName = req.params.userName;
	let email = req.params.email;

	if (!userName) {
		const { result: selectedEmail, error: selectedEmailErr } =
			await userModel.selectUserInfoByEmailId(email);

		if (!selectedEmail) {
			return res.status(404).json({
				status: 'Failure: SelectedOtpToken',
				message: `Given Email: ${email} does not exist`,
			});
		}
		userName = selectedEmail.userName;
	}

	if (!email) {
		const { result: selectedUserName, error: selectedUserErr } =
			await userModel.selectUserInfoByUserName(userName);

		if (!selectedUserName) {
			return res.status(404).json({
				status: 'Failure: SelectedOtpToken',
				message: `Given UserName: ${userName} does not exist`,
			});
		}
		email = selectedUserName.emailId;
	}

	// Select and Check the Validity of the OTP and emailId of the user

	const { result: selectedOtpToken, error: selectedErr } =
		await userModel.selectPasswordResetInfoByToken(otpToken);

	if (selectedErr) {
		return res.status(500).json({
			status: 'Failure: SelectedErr ',
			message: `Internal Server Error : ${selectedErr}`,
		});
	}

	if (!selectedOtpToken) {
		return res.status(404).json({
			status: 'Failure: SelectedOtpToken',
			message: `OTP Token: ${otpToken} does not exist`,
		});
	}

	if (selectedOtpToken.emailId !== email) {
		return res.status(401).json({
			status: 'Failure: SelectedOtpTokenEmail',
			message: `Given Email Id given is not valid`,
		});
	}

	// Delete the expired records from db

	const { result: deletedOtp, error: deletedErr } =
		await userModel.deleteOtpTokenWithDate(email);

	if (deletedErr) {
		return res.status(500).json({
			status: 'Failure: deletedErr ',
			message: `Internal Server Error : ${deletedErr}`,
		});
	}

	// Verify the validity of the respective OtpToken

	if (selectedOtpToken.expiresIn < new Date().toISOString()) {
		return res.status(403).json({
			status: 'Failure: SelectedOtpToken expiresIn ',
			message: `Forbidden response : OTP Token Expired `,
		});
	}

	// Update the verification in the user db

	const { result: updatedIsVerified, error: updatedErr } =
		await userModel.updateIsSignedByUserName(userName);

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

//	@route//	@desc		Follow the Selected User
//	@body		id,toId

exports.followUser = async (req, res) => {
	const fromId = req.body.id;
	const toId = req.body.toId;
	let msg;

	const { result: selectedFromToId, error: selectedFromToErr } =
		await userModel.selectUserFollowsByFromIdToId(fromId, toId);

	if (selectedFromToErr) {
		return res.status(500).json({
			status: 'Failure: selectFromToErr ',
			message: `Internal Server Error : ${selectedFromToErr}`,
		});
	}

	console.log(selectedFromToId.length === 0);

	if (selectedFromToId.length === 0) {
		const { result: createdUserFollows, error: createdUserFollowsErr } =
			await userModel.createUserFollows(fromId, toId);

		if (createdUserFollowsErr) {
			return res.status(500).json({
				status: 'Failure: createdUserFollowsErr ',
				message: `Internal Server Error : ${createdUserFollowsErr}`,
			});
		}

		msg = `User is following `;
	} else {
		const { result: deleteUserFollows, error: deleteUserFollowsErr } =
			await userModel.deleteUserFollowsById(selectedFromToId[0].id);

		if (deleteUserFollowsErr) {
			return res.status(500).json({
				status: 'Failure: selectFromToErr ',
				message: `Internal Server Error : ${deleteUserFollowsErr}`,
			});
		}

		msg = `User Un-followed`;
	}

	return res.status(200).json({
		status: 'Success ',
		message: `${msg}`,
	});
};
