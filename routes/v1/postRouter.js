const express = require("express");
const router = express.Router();

const postController = require("./../../controllers/postController");
const postMiddleware = require("./../../middlewares/postMiddleware");

// CREATE NEW POST

router.route("/createPost").post(postController.addPost);

// NEW COMMENT,REACTION,SAVE

router.route("/newComment").post(postController.addComment);
router.route("/newReaction").post(postController.addReaction);
router.route("/newSave").post(postController.addSave);

//DELETE COMMENT,REACTION,SAVED,POST

router.route("/delete/comment").delete(postController.deleteComment);
router.route("/delete/reaction").delete(postController.deleteReaction);
router.route("/delete/save").delete(postController.deleteSave);
router
  .route("/delete")
  .delete(postMiddleware.deletePostDetails, postController.deletePost);

module.exports = router;
