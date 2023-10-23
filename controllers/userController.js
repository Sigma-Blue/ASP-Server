const userModel = require('./../models/userModel');

// Middlewares :

//	@desc		Check whether the user exists => if exists then call next()
//	@body		password

exports.isUserExist = async (req, res, next) => {
	const userName = req.params.userName;

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

	req.body.id = selectedUser.id;

	next();
};

// Controllers :

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

	const { result: createdUser, error: createdErr } = await userModel.createUser(
		userName,
		email,
		password
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

	const isMatch = password === selectedUser.passwordHashed;

	if (!isMatch) {
		return res.status(401).json({
			status: 'Failure: isMatch',
			message: `User: ${userName} unauthorized `,
		});
	}

	return res.status(200).json({
		status: 'Success ',
		message: `User : ${userName} authorized to login`,
	});
};

//	@route	PATCH	/resetPassword/:userName
//	@desc		Reset the Password of Existing User by given userName
//	@body		password,id

exports.resetPassword = async (req, res) => {
	const { id, password } = req.body;

	// get email of the user and send otp

	const { result: updatedUser, error: updatedErr } =
		await userModel.updatePasswordById(id, password);

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
