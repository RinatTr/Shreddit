const express = require('express');
const router = express.Router();
const { getAllPosts } = require('../queries/q-posts.js');

router.get('/', getAllPosts)

module.exports = router;
