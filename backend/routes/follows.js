const express = require('express');
const router = express.Router();
const { getFollowedByUser } = require('../queries/q-follows.js');

router.get('/:userId', getFollowedByUser)

module.exports = router;
