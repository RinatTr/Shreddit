const express = require('express');
const router = express.Router();
const { getFollowedByUser, addFollow, deleteFollow } = require('../queries/q-follows.js');

router.get('/:userId', getFollowedByUser)
router.post('/', addFollow)
router.delete('/:followId', deleteFollow)

module.exports = router;
