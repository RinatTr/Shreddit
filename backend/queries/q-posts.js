const { db } = require("./q-index.js");

const getAllPosts = (req, res, next) => {
  db.any(`SELECT posts.*, users.username, subshreddits.groupname, subshreddits.img_url FROM posts
          JOIN subshreddits ON posts.subshreddit_id = subshreddits.id
          JOIN users ON posts.poster_id = users.id
          ORDER BY votes DESC`)
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
  db.any(`SELECT comments.*, users.username AS commenter FROM comments
          JOIN users ON comments.commenter_id = users.id
          WHERE post_id = $1
          ORDER BY votes DESC`,[post_id])
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "got all comments per post",
        comments: data
      })
    })
    .catch(err => next(err))
}

const addComment = (req, res, next) => {
  let post_id = parseInt(req.params.id);
  db.none("INSERT INTO comments(commenter_id, post_id, votes, body) VALUES(${commenter_id}, ${post_id}, ${votes}, ${body})", req.body)
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "added a comment"
      })
    })
    .catch(err => next(err))
}

const addPost = (req, res, next) => {
  db.none("INSERT INTO posts(poster_id, subshreddit_id, votes, header, body) VALUES(${poster_id}, ${subshreddit_id}, ${votes}, ${header}, ${body})", req.body)
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "added a post"
      })
    })
    .catch(err => next(err))
}

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
  addComment,
  addPost,
  getAllCommentsPerPost,
  updateVote
};
