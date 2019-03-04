const { db } = require("./q-index.js");

// GET api/comments/counts
const getCommentsCount = (req, res, next) => {
  db.any(`SELECT posts.id AS post_id, COUNT(comments.id) AS comments_count FROM Comments
          JOIN posts ON comments.post_id = posts.id
          GROUP BY posts.id
          ORDER BY posts.id`)
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "got all comment counts",
        counts: data
      })
    })
}

//PATCH /comments/:id
const updateVote = (req, res, next) => {
  let comment_id = parseInt(req.params.id)
  let type = (req.body.type === "upvote") ? "+" : "-";

  db.none(`UPDATE comments SET votes = votes ${type} 1 WHERE id = $1`, [comment_id])
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "you've updated a comment vote"
      })
    })
    .catch(err => {
      return next(err)
    })
}

module.exports = {
  getCommentsCount,
  updateVote
};
