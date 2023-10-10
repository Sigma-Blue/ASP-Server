const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
   res.status(200).json({ message: 'You hit api v1 route' });
});

router.use('/example', require('./exampleRouter'));

module.exports = router;
