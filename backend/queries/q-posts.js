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

const getAllCommentsPerPost = (req, res, next) => {
  let post_id = parseInt(req.params.id)
  db.any(`SELECT * FROM comments WHERE post_id = $1`,[post_id])
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "got all comments per post",
        comments: data
      })
    })
}


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
  getAllCommentsPerPost,
  updateVote
};
