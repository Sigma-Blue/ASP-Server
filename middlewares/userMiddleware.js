const userModel = require('./../models/userModel');

//	@route
//	@desc		Check whether the userName exists => set userId email Id to the req body => next()
//	@body		password

exports.isUserNameExist = async (req, res, next) => {
	const userName = req.body.userName;
	const { result: selectedUser, error: selectedErr } =
		await userModel.selectUserInfoByUserName(userName);

	if (selectedErr) {
		return res.status(500).json({
			status: 'Failure: SelectedIsUserNameExistErr ',
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
	req.body.emailId = selectedUser.emailId;
	console.log(selectedUser.emailId);

	next();
};

//	@route
//	@desc		Check whether emailId exists => set userId userName to the req body => next()
//	@body		emailId

exports.isUserEmailIdExist = async (req, res, next) => {
	const email = req.body.email;

	const { result: selectedEmail, error: selectedErr } =
		await userModel.selectUserInfoByEmailId(email);

	if (selectedErr) {
		return res.status(500).json({
			status: 'Failure: SelectedIsUserEmailIdExistErr ',
			message: `Internal Server Error : ${selectedErr}`,
		});
	}

	if (!selectedEmail) {
		return res.status(404).json({
			status: 'Failure: SelectedUser',
			message: `User: ${email} does not exist`,
		});
	}

	req.body.id = selectedEmail.id;
	req.body.userName = selectedEmail.userName;

	next();
};

//	@route
//	@desc		Check whether the tokenId (i.e userId) exists => next()
//	@body		tokenId

exports.isUserIdExist = async (req, res, next) => {
	const tokenId = req.body.tokenId;

	const { result: selectedUser, error: selectedErr } =
		await userModel.selectUserByUserId(tokenId);

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

	next();
};

//	@route
//	@desc		Check whether the user is Signed In => next()
//	@body		tokenId

exports.isUserSigned = async (req, res, next) => {
	const userName = req.body.userName;

	const { result: selectedIsSigned, error: selectedIsSignedErr } =
		await userModel.selectIsSignedByUserName(userName);

	if (selectedIsSignedErr) {
		return res.status(500).json({
			status: 'Failure: selectedIsSignedErr ',
			message: `Internal Server Error : ${selectedIsSignedErr}`,
		});
	}

	if (!selectedIsSigned.isSigned) {
		return res.status(401).json({
			status: 'Failure: isVerified',
			message: `Unauthorized : user is not yet signedIn `,
		});
	}

	next();
};
