const prisma = require('../prisma/prisma');

//TODO: CREATING:

//* For Creating new Post for a user

const createPost = async (pDesc, pType, userId) => {
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

const createReaction = async (reactType, reactedOnId, reactedById, postId) => {
	try {
		const reaction = await prisma.reaction.create({
			data: {
				reactionType: reactType,
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

const createComment = async (
	commentBody,
	commentedOnId,
	commentedById,
	postId,
	commentId
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
				replyOnComment: {
					connect: { id: commentId },
				},
			},
		});
		return { result: comment, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Creating Save to a post

const createdSave = async (savedOnId, saveById, postId) => {
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

const deletePost = async (id) => {
	try {
		const post = await prisma.post.delete({
			where: {
				id: id,
			},
		});

		deleteCommentByPostId(id);
		deleteReactionByPostId(id);
		deleteSaveByPostId(id);
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For deleting a Reaction by Reaction ID

const deleteReactionById = async (id) => {
	try {
		const reaction = await prisma.reaction.delete({
			where: {
				id: id,
			},
		});
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For deleting a Reaction by Post ID

const deleteReactionByPostId = async (id) => {
	try {
		const reaction = await prisma.reaction.delete({
			where: {
				postId: id,
			},
		});
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For deleting a Comment by Comment ID

const deleteCommentById = async (id) => {
	try {
		const comment = await prisma.comment.delete({
			where: {
				id: id,
			},
		});
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For deleting a Comment by Post ID

const deleteCommentByPostId = async (id) => {
	try {
		const comment = await prisma.comment.delete({
			where: {
				postId: id,
			},
		});
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For deleting a Save by Save ID

const deleteSaveById = async (id) => {
	try {
		const save = await prisma.save.delete({
			where: {
				id: id,
			},
		});
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For deleting a Save by Post ID

const deleteSaveByPostId = async (id) => {
	try {
		const save = await prisma.save.delete({
			where: {
				postId: id,
			},
		});
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//TODO: READING

//* For Selecting the set of Posts by UserId

const selectPostsByUserId = async (id) => {
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

const selectPostsByPostId = async (id) => {
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

//* For Selecting the set of Saved by User/savedBy Id

const selectSavesByUserId = async (id) => {
	try {
		const save = await prisma.save.findMany({
			where: {
				savedById: id,
			},
			select: {
				postId: true,
			},
		});
		return { result: save, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the set of Reacted by User/reactedBy Id

const selectReactionsByUserId = async (id) => {
	try {
		const reaction = await prisma.reaction.findMany({
			where: {
				reactedById: id,
			},
			select: {
				postId: true,
				reactionType: true,
			},
		});
		return { result: reaction, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the set of Commented by User/commentedBy Id

const selectCommentsByUserId = async (id) => {
	try {
		const comment = await prisma.comment.findMany({
			where: {
				commentedById: id,
			},
			select: {
				postId: true,
			},
		});
		return { result: comment, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};
