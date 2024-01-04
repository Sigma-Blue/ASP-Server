const express = require('express');
const router = express.Router();

const searchController = require('./../../controllers/searchController');

router.route('/profile').get(searchController.getSelectedProfile);

module.exports = router;
