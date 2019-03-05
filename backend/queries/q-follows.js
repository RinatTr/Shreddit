const { db } = require("./q-index.js");

// * `GET /api/follows/:userId`
//   * Fetches all users followed by a single user
// * `POST /api/follows/`
//   * adds a following
// * `DELETE /api/follows/`
//   * deletes a following (unfollow / unsubscribe)

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

// //PATCH /comments/:id
// const updateVote = (req, res, next) => {
//   let comment_id = parseInt(req.params.id)
//   let type = (req.body.type === "upvote") ? "+" : "-";
//
//   db.none(`UPDATE comments SET votes = votes ${type} 1 WHERE id = $1`, [comment_id])
//     .then(() => {
//       res.status(200).json({
//         status: "success",
//         message: "you've updated a comment vote"
//       })
//     })
//     .catch(err => {
//       return next(err)
//     })
// }

module.exports = {
  getFollowedByUser
};
