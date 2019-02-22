const { db } = require("./q-index.js");

const getAllPosts = (req, res, next) => {
  db.any(`SELECT posts.*, users.username, subshreddits.groupname, subshreddits.img_url FROM posts
          JOIN subshreddits ON posts.subshreddit_id = subshreddits.id
          JOIN users ON posts.poster_id = users.id`)
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "got all posts",
        posts: data
      });
    })
    .catch(err => next(err));
};

//patch
const updateVote = (req, res, next) => {
  let post_id = parseInt(req.params.id)
  let type = (req.body.type === "upvote") ? "+" : "-";

  db.none(`UPDATE posts SET votes = votes ${type} 1 WHERE id = $1`, [post_id])
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
  getAllPosts,
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
* `GET /api/comments/:userId`
  * Fetches all comments by user
*/
