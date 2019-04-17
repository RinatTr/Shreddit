const express = require('express');
const router = express.Router();
const { getAllSubshreddits, getAllSubshredditsPerUser } = require('../queries/q-subshreddits.js');

router.get('/', getAllSubshreddits)
router.get('/:userId', getAllSubshredditsPerUser)

module.exports = router;
