const postModel = require("./../models/postModel");

exports.deletePostDetails = async (req, res, next) => {
  const postId = req.body.postId;

  const { result: deletedComment, error: deletedErr } =
    await postModel.deleteCommentByPostId(postId);

  if (deletedErr) {
    return res.status(500).json({
      status: "Failure: DeletedErr",
      message: `Internal Server Error : ${deletedErr}`,
    });
  }
  console.log(deletedComment);

  const { result: deletedReaction, error: deletedErr_1 } =
    await postModel.deleteReactionByPostId(postId);

  if (deletedErr_1) {
    return res.status(500).json({
      status: "Failure: DeletedErr",
      message: `Internal Server Error : ${deletedErr}`,
    });
  }
  console.log(deletedReaction);

  const { result: deletedSave, error: deletedErr_2 } =
    await postModel.deleteSaveByPostId(postId);

  if (deletedErr_2) {
    return res.status(500).json({
      status: "Failure: DeletedErr",
      message: `Internal Server Error : ${deletedErr}`,
    });
  }
  console.log(deletedSave);

  next();
};
