const express = require('express');
const router = express.Router();
const { getAllCommentsPerUser,
        getCommentsCount,
        updateVote } = require('../queries/q-comments.js');

router.get('/counts', getCommentsCount)
router.get('/:userId', getAllCommentsPerUser)
router.patch('/:id', updateVote)

module.exports = router;
