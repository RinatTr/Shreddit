const { db } = require("./q-index.js");

const getAllSubshreddits = (req, res, next) => {
  db.any("SELECT * FROM Subshreddits")
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "got all subshreddits",
        subshreddits: data
      });
    })
    .catch(err => next(err));
};

const getAllSubshredditsPerUser = (req, res, next) => {
  let userId = parseInt(req.params.userId)
  db.any(`SELECT subscriptions.subscriber_id, subscriptions.subshreddit_id, subshreddits.groupname FROM subscriptions
          JOIN subshreddits ON subscriptions.subshreddit_id = subshreddits.id
          WHERE subscriptions.subscriber_id = $1`,[userId])
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "got all subshreddits per user "+userId,
        subshreddits: data
      });
    })
    .catch(err => next(err));
};

module.exports = {
  getAllSubshreddits,
  getAllSubshredditsPerUser
};

/*
* `POST /api/subshreddit`
  * Creates new subshreddit community
* `GET /api/subshreddit/`
  * Get all subshreddits for search
* `GET /api/subshreddit/:id/posts`
  * Get all posts in a subshreddit
*/
