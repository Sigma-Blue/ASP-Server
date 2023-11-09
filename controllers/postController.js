const postModel = require("./../models/postModel");

//	@route	POST	/createPost
//	@desc		Creating New Post
//	@body       pDesc, pType, userId

exports.addPost = async (req, res) => {
  const { pDesc, pType, userId } = req.body;

  const { result: createdPost, error: createdErr } = await postModel.createPost(
    pDesc,
    pType,
    userId
  );

  if (createdErr) {
    return res.status(500).json({
      status: "Failure: CreatedErr",
      message: `Internal Server Error : ${createdErr}`,
    });
  }

  console.log(createdPost);
  return res.status(201).json({
    status: "Success",
    message: `Successfully Saved the Post details : ${userId}`,
  });
};

//	@route	POST	/newComment
//	@desc		Creating New Comment
//	@body       comBody,comOnId,comById,postId,comId

exports.addComment = async (req, res) => {
  const { comBody, comOnId, comById, postId, comId } = req.body;

  const { result: createdComment, error: createdErr } =
    await postModel.createComment(comBody, comOnId, comById, postId, comId);

  if (createdErr) {
    return res.status(500).json({
      status: "Failure: CreatedErr",
      message: `Internal Server Error : ${createdErr}`,
    });
  }

  console.log(createdComment);
  return res.status(201).json({
    status: "Success",
    message: `Successfully Saved the Comment details`,
  });
};
