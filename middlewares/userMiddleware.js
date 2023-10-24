const userModel = require('./../models/userModel');

//	@route	PATCH	/resetPassword/:userName
//	@desc		Check whether the userName exists => if exists then call next()
//	@body		password

exports.isUserNameExist = async (req, res, next) => {
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
	req.body.emailId = selectedUser.emailId;

	next();
};

//	@route
//	@desc		Check whether the tokenId (i.e userId) exists => if exists then call next()
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
