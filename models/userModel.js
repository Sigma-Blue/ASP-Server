const prisma = require('../prisma/prisma');

//TODO: CREATING:

//* For creating a new user

exports.createUser = async (userName, email, password) => {
	try {
		const user = await prisma.user.create({
			data: {
				userName: userName,
				emailId: email,
				passwordHashed: password,
			},
		});

		return { result: user, error: null };
	} catch (err) {
		return { result: null, error: err };
	}
};

//* For creating user Following from one user to another

exports.createUserFollows = async (isAccepted, fromUserId, toUserId) => {
	try {
		const userFollows = await prisma.userFollows.create({
			data: {
				isAccepted,
				fromUSer: {
					connect: { id: fromUserId },
				},
				toUser: {
					connect: { id: toUserId },
				},
			},
		});
		return { result: user, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For creating Password Reset  Token

exports.createPasswordResetToken = async (token, expiresIn) => {
	try {
		const passwordReset = await prisma.passwordReset.create({
			data: {
				token: token,
				expiresIn: expiresIn,
			},
		});
		return { result: passwordReset, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//TODO: UPDATING:

//* For updating new Password to the user

exports.updatePasswordById = async (id, password) => {
	try {
		const user = await prisma.user.update({
			where: {
				id: id,
			},
			data: {
				passwordHashed: password,
			},
		});
		return { result: user, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For updating new userName to the user

exports.updateUserNameById = async (id, userName) => {
	try {
		const user = await prisma.user.update({
			where: {
				id: id,
			},
			data: {
				userName,
			},
		});
		return { result: user, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For updating isAccepted by Id

exports.updateUserFollowsByFromId = async (id) => {
	try {
		const userFollows = await prisma.userFollows.update({
			where: {
				id: id,
			},
			data: {
				isAccepted: true,
			},
		});
		return { result: userFollows, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For updating isVerified by userName

exports.updateIsVerifiedByUserName = async (userName) => {
	try {
		const user = await prisma.user.update({
			where: {
				userName: userName,
			},
			data: {
				isVerified: true,
			},
		});
		return { result: user, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//TODO: DELETING:

//* For deleting user following by FromUserId

exports.deleteUserFollowsByFromId = async (id) => {
	try {
		const userFollows = await prisma.userFollows.deleteMany({
			where: {
				fromUserId: id,
			},
		});
		return { result: null, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For deleting OTP Token in Password Reset By Token

exports.deleteOtpTokenWithDate = async () => {
	try {
		const passwordReset = await prisma.passwordReset.deleteMany({
			where: {
				expiresIn: {
					lte: new Date().toISOString(),
				},
			},
		});
		return { result: null, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//TODO: READING:

//* For Selecting the User by email Id

exports.selectUserInfoByEmailId = async (email) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				emailId: email,
			},
		});
		return { result: user, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the unique UserID by UserName

exports.selectUserIdByUserName = async (userName) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				userName: userName,
			},
			select: {
				id: true,
			},
		});
		return { result: user, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the unique UserID and Password by UserName

exports.selectUserInfoByUserName = async (userName) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				userName: userName,
			},
			select: {
				id: true,
				passwordHashed: true,
				emailId: true,
			},
		});
		return { result: user, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the unique UserID and Password by UserName

exports.selectUserByUserId = async (id) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: id,
			},
		});
		return { result: user, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the Followers by From User Id

exports.selectUserFollowsByFromId = async (id) => {
	try {
		const userFollows = await prisma.userFollows.findMany({
			where: {
				fromUserId: id,
			},
			select: {
				id: true,
				toUserId: true,
				isAccepted: true,
			},
		});
		return { result: userFollows, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the Followers by To User Id

exports.selectUserFollowsByToId = async (id) => {
	try {
		const user = await prisma.userFollows.findMany({
			where: {
				toUserId: id,
			},
			select: {
				id: true,
				fromUserId: true,
				isAccepted: true,
			},
		});
		return { result: user, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the Password Reset Info By Token

exports.selectPasswordResetInfoByToken = async (token) => {
	try {
		const passwordReset = await prisma.passwordReset.findUnique({
			where: {
				token: token,
			},
			select: {
				expiresIn: true,
			},
		});
		return { result: passwordReset, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the isVerified  by userName

exports.selectIsVerifiedByUserName = async (userName) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				userName: userName,
			},
			select: {
				isVerified: true,
			},
		});
		return { result: user, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};
