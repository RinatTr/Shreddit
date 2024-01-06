const { db } = require("./q-index.js");

const getAllSubshreddits = (_, res, next) => {
  db.any('SELECT * FROM subshreddits')
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "got all subshreddits",
        subshreddits: data
      });
    })
    .catch(err => {
      console.log("error!!", err)
      next(err)
    });
};

const getASubshreddit = (req, res, next) => {
  let subId = parseInt(req.params.subId)
  db.one("SELECT * FROM subshreddits WHERE id=$1",[subId])
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "got a subshreddit",
        subshreddit: data
      });
    })
    .catch(err => next(err));
};

const getAllSubshredditsPerUser = (req, res, next) => {
  let userId = parseInt(req.params.userId)
  db.any(`SELECT subscriptions.id AS subscription_id, subscriptions.subscriber_id, subscriptions.subshreddit_id, subshreddits.groupname FROM subscriptions
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

const getPostsPerSubshreddit = (req, res, next) => {
  let subId = parseInt(req.params.subId)
  db.any(`SELECT users.username, posts.id, posts.subshreddit_id, subshreddits.groupname, posts.created_at, posts.votes, posts.header
          FROM posts JOIN users ON posts.poster_id = users.id
          JOIN subshreddits ON posts.subshreddit_id = subshreddits.id
          WHERE posts.subshreddit_id=$1
          ORDER BY posts.votes DESC`, [subId])
          .then(data => {
            res.status(200).json({
              status: "success",
              message: "got all posts per subshreddit",
              posts: data
            })
          })
          .catch(err => next(err))
}


module.exports = {
  getAllSubshreddits,
  getASubshreddit,
  getAllSubshredditsPerUser,
  getPostsPerSubshreddit
};

/*
* `POST /api/subshreddit`
  * Creates new subshreddit community
* `GET /api/subshreddit/`
  * Get all subshreddits for search
*/
