const express = require('express');
const router = express.Router();
const { getAllPosts,
        getAllCommentsPerPost,
        addComment,
        updateVote } = require('../queries/q-posts.js');

router.get('/', getAllPosts)
router.get('/:id/comments', getAllCommentsPerPost)
router.patch('/:id', updateVote)
router.post('/:id/comments', addComment)

//`POST /api/posts/:id/comments`

module.exports = router;
