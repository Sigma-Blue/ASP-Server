const express = require("express");
const router = express.Router();

const profileController = require("./../../controllers/profileController");

// CREATE NEW PROFILE

router.route("/createProfile").post(profileController.addProfile);
router.route("/createLocation").post(profileController.addLocation);
router.route("/createCourse").post(profileController.addCourse);

// DISPLAY PROFILE DETAILS
router.route("/:userId").get(profileController.getProfile);
router.route("/location/:profileId").get(profileController.getLocation);
router.route("/course/:profileId").get(profileController.getCourse);

module.exports = router;
