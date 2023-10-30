const userModel = require('./../models/userModel');

//	@route	PATCH	/resetPassword/:userName
//	@desc		Check whether the userName exists => set userId email Id to the req body => next()
//	@body		password

exports.isUserNameExist = async (req, res, next) => {
	let userName = req.params.userName;
	if (!userName) {
		userName = req.body.userName;
	}
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

//	@route	PATCH	/resetPassword/:userName
//	@desc		Check whether emailId exists => set userId userName to the req body => next()
//	@body		password

exports.isUserEmailIdExist = async (req, res, next) => {
	let emailId = req.params.email;

	const { result: selectedEmail, error: selectedErr } =
		await userModel.selectUserInfoByEmailId(emailId);

	if (selectedErr) {
		return res.status(500).json({
			status: 'Failure: SelectedIsUserEmailIdExistErr ',
			message: `Internal Server Error : ${selectedErr}`,
		});
	}

	if (!selectedEmail) {
		return res.status(404).json({
			status: 'Failure: SelectedUser',
			message: `User: ${emailId} does not exist`,
		});
	}

	req.body.id = selectedEmail.id;
	req.body.Name = selectedEmail.userName;

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
//	@desc		Check whether the user is Verified  => next()
//	@body		tokenId

exports.isUserVerified = async (req, res, next) => {
	const userName = req.body.userName;

	const { result: selectedIsVerified, error: selectedErr } =
		await userModel.selectIsVerifiedByUserName(userName);

	if (selectedErr) {
		return res.status(500).json({
			status: 'Failure: SelectedIsVerifiedErr ',
			message: `Internal Server Error : ${selectedErr}`,
		});
	}

	if (!selectedIsVerified.isVerified) {
		return res.status(401).json({
			status: 'Failure: isVerified',
			message: `Unauthorized : user is not yet verified`,
		});
	}

	next();
};
