const express = require('express');
const router = express.Router();
const { getAllPosts,
        updateVote } = require('../queries/q-posts.js');

router.get('/', getAllPosts)
router.patch('/:id', updateVote)

module.exports = router;
