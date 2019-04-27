const express = require('express');
const router = express.Router();
const { getAllSubshreddits, getAllSubshredditsPerUser, getPostsPerSubshreddit, getASubshreddit } = require('../queries/q-subshreddits.js');

router.get('/', getAllSubshreddits)
router.get('/:subId', getASubshreddit)
router.get('/user/:userId', getAllSubshredditsPerUser)
router.get('/:subId/posts', getPostsPerSubshreddit)

module.exports = router;
