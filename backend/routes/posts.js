const express = require('express');
const router = express.Router();
const { getAllPosts,
        getAllCommentsPerPost,
        updateVote } = require('../queries/q-posts.js');

router.get('/', getAllPosts)
router.get('/:id/comments', getAllCommentsPerPost)
router.patch('/:id', updateVote)

module.exports = router;
