const express = require('express');
const router = express.Router();

const homeController = require('../../controllers/homeController');

router.route('/:userId/').get(homeController.getHomePage);

module.exports = router;
