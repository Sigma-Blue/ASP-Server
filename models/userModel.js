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

exports.createUserFollows = async (fromUserId, toUserId) => {
	try {
		const userFollows = await prisma.userFollows.create({
			data: {
				fromUSer: {
					connect: { id: fromUserId },
				},
				toUser: {
					connect: { id: toUserId },
				},
			},
		});
		return { result: userFollows, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For creating Password Reset  Token

exports.createPasswordResetToken = async (token, expiresIn, emailId) => {
	try {
		const passwordReset = await prisma.passwordReset.create({
			data: {
				token: token,
				expiresIn: expiresIn,
				emailId: emailId,
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

//* For updating isSigned by userName

exports.updateIsSignedByUserName = async (userName) => {
	try {
		const user = await prisma.user.update({
			where: {
				userName: userName,
			},
			data: {
				isSigned: true,
			},
		});
		return { result: user, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For updating isVerified by userName

exports.updateIsVerifiedByUserId = async (id) => {
	try {
		const user = await prisma.user.update({
			where: {
				id: id,
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

//* For deleting user following by Id

exports.deleteUserFollowsById = async (id) => {
	try {
		const userFollows = await prisma.userFollows.delete({
			where: {
				id: id,
			},
		});
		return { result: null, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

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
			select: {
				id: true,
				emailId: true,
				userName: true,
				registeredAt: true,
				updatedAt: true,
				role: true,
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

//* For Selecting the unique User Info by UserName

exports.selectUserInfoByUserName = async (userName) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				userName: userName,
			},
			select: {
				id: true,
				emailId: true,
				userName: true,
				registeredAt: true,
				updatedAt: true,
				role: true,
			},
		});
		return { result: user, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the unique UserID and Password by UserName

exports.selectUserPasswordByUserName = async (userName) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				userName: userName,
			},
			select: {
				passwordHashed: true,
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
			select: {
				id: true,
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
				emailId: true,
			},
		});
		return { result: passwordReset, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the isSigned  by userName

exports.selectIsSignedByUserName = async (userName) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				userName: userName,
			},
			select: {
				isSigned: true,
			},
		});
		return { result: user, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the isVerified  by userId

exports.selectIsVerifiedByUserId = async (id) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: id,
			},
			select: {
				isSigned: true,
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

exports.selectUserFollowsByFromIdToId = async (fromId, toId) => {
	try {
		const user = await prisma.userFollows.findMany({
			where: {
				toUserId: toId,
				fromUserId: fromId,
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
