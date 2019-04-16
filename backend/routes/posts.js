const express = require('express');
const router = express.Router();
const { getAllPosts,
        getAllCommentsPerPost,
        addPost,
        addComment,
        updateVote } = require('../queries/q-posts.js');

router.get('/', getAllPosts)
router.get('/:id/comments', getAllCommentsPerPost)
router.patch('/:id', updateVote)
router.post('/:id/comments', addComment)
router.post('/add', addPost)

//`POST /api/posts/:id/comments`

module.exports = router;
