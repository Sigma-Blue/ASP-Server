const express = require("express");
const router = express.Router();

const postController = require("./../../controllers/postController");

// CREATE NEW POST

router.route("/createPost").post(postController.addPost);

// NEW COMMENT,REACTION,SAVE
router.route("/newComment").post(postController.addComment);
// router.route("/newReaction").post(postController.addReaction);
// router.route("/newSave").post(postController.addSave);

// //DELETE COMMENT,REACTION,SAVED

// router.route("/deleteComment/:commentId").delete(postController.deleteComment);
// router
//   .route("/deleteReaction/:reactionId")
//   .delete(postController.deleteReaction);
// router.route("/deleteSave/:saveId").delete(postController.deleteSave);

module.exports = router;
