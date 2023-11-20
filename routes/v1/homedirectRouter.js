const express = require("express");
const router = express.Router();

const postController = require("../../controllers/postController");
const postMiddleware = require("../../middlewares/postMiddleware");

router.route("/:userId/").get(postController.getHomePage);

module.exports = router;
