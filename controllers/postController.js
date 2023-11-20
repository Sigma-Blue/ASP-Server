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
//	@body       comBody,comOnId,comById,postId

exports.addComment = async (req, res) => {
  const { comBody, comOnId, comById, postId } = req.body;

  const { result: createdComment, error: createdErr } =
    await postModel.createComment(comBody, comOnId, comById, postId);

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

//	@route	POST	/newReaction
//	@desc		Creating New Reaction
//	@body       postId, reaOn, reaBy

exports.addReaction = async (req, res) => {
  const { postId, reaOn, reaBy } = req.body;

  const { result: createdReaction, error: createdErr } =
    await postModel.createReaction(reaOn, reaBy, postId);

  if (createdErr) {
    return res.status(500).json({
      status: "Failure: CreatedErr",
      message: `Internal Server Error : ${createdErr}`,
    });
  }

  console.log(createdReaction);
  return res.status(201).json({
    status: "Success",
    message: `Successfully Saved the Reaction details`,
  });
};

//	@route	POST	/newSave
//	@desc		Creating New Save
//	@body       postId, savOn, savBy

exports.addSave = async (req, res) => {
  const { postId, savOn, savBy } = req.body;

  const { result: createdSave, error: createdErr } = await postModel.createSave(
    savOn,
    savBy,
    postId
  );

  if (createdErr) {
    return res.status(500).json({
      status: "Failure: CreatedErr",
      message: `Internal Server Error : ${createdErr}`,
    });
  }

  console.log(createdSave);
  return res.status(201).json({
    status: "Success",
    message: `Successfully Saved the Save details`,
  });
};

//  @route  GET /:postId
//  @desc   Getting the details of a post
//  @body

exports.getPost = async (req, res) => {
  const { postId } = req.params;

  const { result: post, error: postErr } = await postModel.selectPostsByPostId(
    postId
  );

  if (postErr) {
    return res.status(500).json({
      status: "Failure: PostErr",
      message: `Internal Server Error : ${postErr}`,
    });
  }

  console.log(post);
  return res.status(200).json({
    status: "Success",
    message: `Successfully Retrieved the Post details`,
    data: post,
  });
};

//  @route  GET /comment/:postId
//  @desc   Getting the comments of the post
//  @body

exports.getComment = async (req, res) => {
  const { postId } = req.params;

  const { result: post, error: postErr } =
    await postModel.selectCommentsByProfileId(postId);

  if (postErr) {
    return res.status(500).json({
      status: "Failure: PostErr",
      message: `Internal Server Error : ${postErr}`,
    });
  }

  console.log(post);
  return res.status(200).json({
    status: "Success",
    message: `Successfully Retrieved the Comment details`,
    data: post,
  });
};

//  @route  GET /reaction/:postId
//  @desc   Getting the reaction of the post
//  @body

exports.getReaction = async (req, res) => {
  const { postId } = req.params;

  const { result: post, error: postErr } =
    await postModel.selectReactionsByProfileId(postId);

  if (postErr) {
    return res.status(500).json({
      status: "Failure: PostErr",
      message: `Internal Server Error : ${postErr}`,
    });
  }

  console.log(post);
  return res.status(200).json({
    status: "Success",
    message: `Successfully Retrieved the Reaction details`,
    data: post,
  });
};

//  @route  GET /save/:postId
//  @desc   Getting the save of the post
//  @body

exports.getSave = async (req, res) => {
  const { postId } = req.params;

  const { result: post, error: postErr } =
    await postModel.selectSavesByProfileId(postId);

  if (postErr) {
    return res.status(500).json({
      status: "Failure: PostErr",
      message: `Internal Server Error : ${postErr}`,
    });
  }

  console.log(post);
  return res.status(200).json({
    status: "Success",
    message: `Successfully Retrieved the Save Post details`,
    data: post,
  });
};

//  @route  DELETE  /delete/comment
//  @desc   Deleting comment of the post
//  @body   commentId

exports.deleteComment = async (req, res) => {
  const { commentId } = req.body;

  const { result: deletedComment, error: deletedErr } =
    await postModel.deleteCommentById(commentId);

  if (deletedErr) {
    return res.status(500).json({
      status: "Failure: DeletedErr",
      message: `Internal Server Error : ${deletedErr}`,
    });
  }

  console.log(deletedComment);
  return res.status(200).json({
    status: "Success",
    message: `Successfully Deleted the Comment details`,
  });
};

//  @route  DELETE  /delete/reaction
//  @desc   Deleting reaction of the post
//  @body   reactionId

exports.deleteReaction = async (req, res) => {
  const { reactionId } = req.body;

  const { result: deletedReaction, error: deletedErr } =
    await postModel.deleteReactionById(reactionId);

  if (deletedErr) {
    return res.status(500).json({
      status: "Failure: DeletedErr",
      message: `Internal Server Error : ${deletedErr}`,
    });
  }

  console.log(deletedReaction);
  return res.status(200).json({
    status: "Success",
    message: `Successfully Deleted the Reaction details`,
  });
};

//  @route  DELETE  /delete/save
//  @desc   Deleting saved post
//  @body   saveId

exports.deleteSave = async (req, res) => {
  const { saveId } = req.body;

  const { result: deletedSave, error: deletedErr } =
    await postModel.deleteSaveById(saveId);

  if (deletedErr) {
    return res.status(500).json({
      status: "Failure: DeletedErr",
      message: `Internal Server Error : ${deletedErr}`,
    });
  }

  console.log(deletedSave);
  return res.status(200).json({
    status: "Success",
    message: `Successfully Deleted the Save details`,
  });
};

//  @route  DELETE  /delete/post
//  @desc   Deleting the user post
//  @body   postId

exports.deletePost = async (req, res) => {
  const { postId } = req.body;

  const { result: deletedPost, error: deletedErr } =
    await postModel.deletePostByPostId(postId);

  if (deletedErr) {
    return res.status(500).json({
      status: "Failure: DeletedErr",
      message: `Internal Server Error : ${deletedErr}`,
    });
  }

  console.log(deletedPost);
  return res.status(200).json({
    status: "Success",
    message: `Successfully Deleted the Post details`,
  });
};

// @route GET /?size=sizeid&skip=skipid
//  @desc   Getting the posts for home page
//  @body   postId

exports.getHomePage = async (req, res) => {
  const { size, skip } = req.query;
  const { userId } = req.params;

  const { result: selectedPost, error: selectErr } =
    await postModel.selectPostsForHomePage(Number(size), Number(skip), userId);

  if (selectErr) {
    return res.status(500).json({
      status: "Failure: PostErr",
      message: `Internal Server Error : ${selectErr}`,
    });
  }

  console.log(selectedPost);
  return res.status(200).json({
    status: "Success",
    message: `Successfully Retrieved the Homepage Post details`,
    data: selectedPost,
  });
};
