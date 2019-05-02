const express = require('express');
const router = express.Router();
const { addSubscription, deleteSubscription } = require('../queries/q-subscriptions.js');

router.post('/', addSubscription)
router.delete('/:subscriptionId', deleteSubscription)

module.exports = router;
