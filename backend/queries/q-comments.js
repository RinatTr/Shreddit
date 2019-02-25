const { db } = require("./q-index.js");

const getAllCommentsPerUser = (req, res, next) => {
  let user_id = parseInt(req.params.userId)
  db.any(`SELECT comments.*, u1.username AS poster, u2.username AS commenter, posts.header AS post_header, posts.poster_id FROM comments
          JOIN posts ON comments.post_id = posts.id
          JOIN users u1 ON posts.poster_id = u1.id
          JOIN users u2 ON comments.commenter_id = u2.id
          WHERE u2.id = $1`,[user_id])
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "got all comments per user",
        comments: data
      });
    })
    .catch(err => next(err));
};

// SELECT a.Name AS Employee
// FROM Employee a
// JOIN Employee b ON
// (a.ManagerId = b.Id) --SELF JOIN: outputs {"headers":["Employee"],"values":[["Joe"],["Henry"]]}
// WHERE a.Salary > b.Salary

//patch
const updateVote = (req, res, next) => {
  let comment_id = parseInt(req.params.id)
  let type = (req.body.type === "upvote") ? "+" : "-";

  db.none(`UPDATE comments SET votes = votes ${type} 1 WHERE id = $1`, [comment_id])
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "you updated a vote"
      })
    })
    .catch(err => {
      return next(err)
    })
}

module.exports = {
  getAllCommentsPerUser,
  updateVote
};

/*
* `GET /api/posts/` V
  * Fetches all posts
* `GET /api/posts/:userId`
  * Fetches all posts by user
* `GET /api/posts/:userId/saved`
  * Fetches all saved posts by a user
* `POST /api/posts/`
  * Add a new post
* `GET /api/posts/:id`
  * Get a single post
* `GET /api/posts/:id/comments`
  * Get all comments for a single post
* `DELETE /api/posts/:id`
  * Delete a post
* `POST /api/posts/:id/comments`
  * Add a comment for a single post
* `DELETE /api/posts/:id/comments`
  * Delete a comment for a single post
* `GET /api/comments/:userId` V
  * Fetches all comments by user
*/