const prisma = require('../prisma/prisma');

// TODO: CREATING

//TODO: READING

//*For selecting the posts for the Home Page

exports.selectPostsForHomePage = async (size, skip, userId) => {
	try {
		const selectedPost = await prisma.post.findMany({
			skip: skip,
			take: size,
			where: {
				NOT: {
					userId: userId,
				},
			},
		});
		return { result: selectedPost, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};
