const prisma = require('../prisma/prisma');

//TODO: CREATING:

//* For Creating new Post for a user

exports.createPost = async (pDesc, pType, userId) => {
	try {
		const post = await prisma.post.create({
			data: {
				postDescription: pDesc,
				postType: pType,
				createdBy: { connect: { id: userId } },
			},
		});
		return { result: post, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Creating Reaction to a Post

exports.createReaction = async (reactedOnId, reactedById, postId) => {
	try {
		const reaction = await prisma.reaction.create({
			data: {
				postReactedOn: {
					connect: { id: postId },
				},
				reactedByUserId: {
					connect: { id: reactedById },
				},
				userReactedOn: {
					connect: { id: reactedOnId },
				},
			},
		});
		return { result: reaction, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Creating Comment to a post

exports.createComment = async (
	commentBody,
	commentedOnId,
	commentedById,
	postId
) => {
	try {
		const comment = await prisma.comment.create({
			data: {
				commentBody,
				postCommentedOn: {
					connect: { id: postId },
				},
				commentedByUserId: {
					connect: { id: commentedById },
				},
				userCommentedOn: {
					connect: { id: commentedOnId },
				},
			},
		});
		return { result: comment, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Creating Save to a post

exports.createSave = async (savedOnId, saveById, postId) => {
	try {
		const save = await prisma.save.create({
			data: {
				postSavedOn: {
					connect: { id: postId },
				},
				userSavedOn: {
					connect: { id: savedOnId },
				},
				savedByUserId: {
					connect: { id: saveById },
				},
			},
		});
		return { result: save, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//TODO: DELETING:

//* For deleting a post by Post ID

exports.deletePostByPostId = async (id) => {
	try {
		const post = await prisma.post.delete({
			where: {
				id: id,
			},
		});
		return { result: null, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For deleting a Reaction by Reaction ID

exports.deleteReactionById = async (id) => {
	try {
		const reaction = await prisma.reaction.delete({
			where: {
				id: id,
			},
		});
		return { result: null, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For deleting a Reaction by Post ID

exports.deleteReactionByPostId = async (id) => {
	try {
		const reaction = await prisma.reaction.deleteMany({
			where: {
				postId: id,
			},
		});
		return { result: null, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For deleting a Comment by Comment ID

exports.deleteCommentById = async (id) => {
	try {
		const comment = await prisma.comment.delete({
			where: {
				id: id,
			},
		});
		return { result: null, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For deleting a Comment by Post ID

exports.deleteCommentByPostId = async (id) => {
	try {
		const comment = await prisma.comment.deleteMany({
			where: {
				postId: id,
			},
		});
		return { result: null, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For deleting a Save by Save ID

exports.deleteSaveById = async (id) => {
	try {
		const save = await prisma.save.delete({
			where: {
				id: id,
			},
		});
		return { result: null, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For deleting a Save by Post Id

exports.deleteSaveByPostId = async (id) => {
	try {
		const save = await prisma.save.deleteMany({
			where: {
				postId: id,
			},
		});
		return { result: null, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//TODO: READING

//* For Selecting the set of Posts by UserId

exports.selectPostsByUserId = async (id) => {
	try {
		const post = await prisma.post.findMany({
			where: {
				userId: id,
			},
			include: {
				reaction: true,
				comment: true,
				save: true,
			},
		});
		return { result: post, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the set of Posts by PostId

exports.selectPostsByPostId = async (id) => {
	try {
		const post = await prisma.post.findMany({
			where: {
				userId: id,
			},
			include: {
				Reaction: true,
				Comment: true,
				Save: true,
				_count: true,
			},
		});
		return { result: post, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the set of Saved by Post Id

exports.selectSavesByPostId = async (id) => {
	try {
		const save = await prisma.save.findMany({
			where: {
				postId: id,
			},
		});
		return { result: save, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the set of Reacted by Post Id

exports.selectReactionsByPostId = async (id) => {
	try {
		const reaction = await prisma.reaction.findMany({
			where: {
				postId: id,
			},
		});
		return { result: reaction, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the set of Commented by Post Id

exports.selectCommentsByPostId = async (id) => {
	try {
		const comment = await prisma.comment.findMany({
			where: {
				postId: id,
			},
		});
		return { result: comment, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};
