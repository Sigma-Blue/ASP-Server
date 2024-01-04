const prisma = require('./../prisma/prisma');

//TODO: READING

//* For selecting the set of Profile for Search Page

exports.searchProfileForSearchPage = async (userName) => {
	try {
		const profile = await prisma.user.findMany({
			where: {
				userName: {
					contains: userName,
				},
				include: {
					_count: true,
				},
			},
		});
		return { result: reaction, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};
