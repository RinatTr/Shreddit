const express = require('express');
const router = express.Router();
const { getCommentsCount,
        updateVote } = require('../queries/q-comments.js');

router.get('/counts', getCommentsCount)
router.patch('/:id', updateVote)

module.exports = router;
