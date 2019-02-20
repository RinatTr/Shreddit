const express = require('express');
const router = express.Router();
const { getAllSubshreddits } = require('../queries/q-subshreddits.js');

router.get('/', getAllSubshreddits)

module.exports = router;
