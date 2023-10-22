const prisma = require('../prisma/prisma');

//* For creating a new user

const createUser = async (userName, email, password, role) => {
	try {
		const user = await prisma.user.create({
			data: {
				userName,
				email,
				passwordHashed: password,
				role,
			},
		});

		return { result: user, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For updating new Password to the user

const updatePassword = async (id, password) => {
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

//* For updating new Password to the user

const updateUserName = async (id, userName) => {
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

//* For creating user Following from one user to another

const createUserFollows = async (isAccepted, fromUserId, toUserId) => {
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

//* For deleting user following by FromUserId

const deleteUserFollowsByFromId = async (id) => {
	try {
		const userFollows = await prisma.userFollows.deleteMany({
			where: {
				fromUserId: id,
			},
		});
	} catch (err) {
		return { result: null, error: err.message };
	}
};
