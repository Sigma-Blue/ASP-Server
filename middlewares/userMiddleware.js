const userModel = require('./../models/userModel');

//	@route	PATCH	/resetPassword/:userName
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
	req.body.emailId = selectedUser.emailId;

	next();
};
