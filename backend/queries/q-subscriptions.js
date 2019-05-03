const { db } = require("./q-index.js");

const addSubscription = (req, res, next) => {
  db.none('INSERT INTO subscriptions(subscriber_id, subshreddit_id) VALUES (${subscriber_id}, ${subshreddit_id})', req.body)
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "you've added a subscription"
      })
    })
    .catch(err => {
      return next(err)
    })
}

const deleteSubscription = (req, res, next) => {
  const subscriptionId = parseInt(req.params.subscriptionId)
  db.none('DELETE FROM subscriptions WHERE id=$1',[subscriptionId])
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "you've deleted a subscription"
      })
    })
    .catch(err => {
      return next(err)
    })
}

module.exports = {
  addSubscription,
  deleteSubscription
};
