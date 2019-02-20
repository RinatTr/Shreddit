const { db } = require("./q-index.js");

const getAllPosts = (req, res, next) => {
  db.any("SELECT * FROM posts")
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "got all posts",
        users: data
      });
    })
    .catch(err => next(err));
};

module.exports = {
  getAllPosts
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
