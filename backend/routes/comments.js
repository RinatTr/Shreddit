const express = require('express');
const router = express.Router();
const { getAllCommentsPerUser,
        updateVote } = require('../queries/q-comments.js');

router.get('/:userId', getAllCommentsPerUser)
router.patch('/:id', updateVote)

module.exports = router;
