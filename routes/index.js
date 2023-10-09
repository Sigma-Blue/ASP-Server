const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
   res.status(200).json({
      message: 'You hit api route',
   });
});

router.use('/v1', require('./v1'));
// router.use('/v2', require('./v2'));

module.exports = router;
