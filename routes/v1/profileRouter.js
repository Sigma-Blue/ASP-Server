const express = require("express");
const router = express.Router();

const profileController = require("./../../controllers/profileController");

// CREATING NEW PROFILE

router.route("/createProfile").post(profileController.addProfile);
router.route("/createLocation").post(profileController.addLocation);
router.route("/createCourse").post(profileController.addCourse);

module.exports = router;
