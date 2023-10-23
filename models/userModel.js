const prisma = require('../prisma/prisma');

//TODO: CREATING:

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

//TODO: UPDATING:

//* For updating new Password to the user

const updatePasswordById = async (id, password) => {
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

const updateUserNameById = async (id, userName) => {
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

const updateUserFollowsByFromId = async (id) => {
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

//TODO: DELETING:

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

//TODO: READING:

//* For Selecting the unique UserID and Password by UserName

const selectUserInfoByUserName = async (userName) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				userName: userName,
			},
			select: {
				id: true,
				passwordHashed: true,
			},
		});
		return { result: user, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the unique UserID and Password by UserName

const selectUserByUserId = async (id) => {
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

const selectUserFollowsByFromId = async (id) => {
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

const selectUserFollowsByToId = async (id) => {
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
