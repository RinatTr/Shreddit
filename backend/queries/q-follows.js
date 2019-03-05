const { db } = require("./q-index.js");

const getFollowedByUser = (req, res, next) => {
  let userId = parseInt(req.params.userId);
  db.any(`SELECT follows.*, users.username AS followed_user FROM follows
          JOIN users ON follows.followed_id = users.id
          WHERE follower_id = $1`,[userId])
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "got all users followed by user",
        follows: data
      })
    })
}

//POST /follows/
const addFollow = (req, res, next) => {
  db.none('INSERT INTO follows VALUES (${follower_id}, ${followed_id})', req.body)
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "you've added a following"
      })
    })
    .catch(err => {
      return next(err)
    })
}

const deleteFollow = (req, res, next) => {
  const followId = parseInt(req.params.followId)
  db.none('DELETE FROM follows WHERE id=$1',[followId])
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "you've deleted a following"
      })
    })
    .catch(err => {
      return next(err)
    })
}
module.exports = {
  getFollowedByUser,
  addFollow,
  deleteFollow
};
