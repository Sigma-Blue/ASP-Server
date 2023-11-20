const express = require("express");
const router = express.Router();

const postController = require("./../../controllers/postController");

router.route("/:userId/").get(postController.getHomePage);

module.exports = router;
