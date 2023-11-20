const prisma = require("../prisma/prisma");

//TODO: READING

//* For Selecting the set of Posts for Homepage

exports.selectPostsForHomePage = async (size, skip, userId) => {
  try {
    const post = await prisma.post.findMany({
      skip: skip,
      take: size,
      where: {
        NOT: {
          userId: userId,
        },
      },
    });
    return { result: post, error: null };
  } catch (err) {
    return { result: null, error: err.message };
  }
};
