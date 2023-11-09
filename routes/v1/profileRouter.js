const express = require("express");
const router = express.Router();

const profileController = require("./../../controllers/profileController");

// CREATE NEW PROFILE

router.route("/createProfile").post(profileController.addProfile);
router.route("/createLocation").post(profileController.addLocation);
router.route("/createCourse").post(profileController.addCourse);
router.route("/createWork").post(profileController.addWork);
router.route("/createSkill").post(profileController.addSkill);

// DISPLAY PROFILE DETAILS

router.route("/:userId").get(profileController.getProfile);
router.route("/location/:profileId").get(profileController.getLocation);
router.route("/course/:profileId").get(profileController.getCourse);
router.route("/work/:profileId").get(profileController.getWork);
router.route("/skill/:profileId").get(profileController.getSkill);

// DELETE PROFILE DETAILS

router.route("/delete/location").delete(profileController.deleteLocation);
router.route("/delete/course").delete(profileController.deleteCourse);
router.route("/delete/work").delete(profileController.deleteWork);
router.route("/delete/skill").delete(profileController.deleteSkill);

module.exports = router;
