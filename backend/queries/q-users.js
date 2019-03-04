const { db } = require("./q-index.js");
const authHelpers = require("../auth/helpers");

const getAllUsers = (req, res, next) => {
  db.any("SELECT * FROM users")
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "got all users",
        users: data
      });
    })
    .catch(err => next(err));
};

const getOneUser = (req, res, next) => {
  let username = req.params.username
  db.one("SELECT id, username, avatar_url FROM users WHERE username=$1", [username])
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "got one user",
        user: data
      })
    })
    .catch(err => next(err))
}

const getPostsPerUser = (req, res, next) => {
  let userId = parseInt(req.params.userId)
  db.any(`SELECT posts.id, posts.subshreddit_id, subshreddits.groupname, posts.created_at, posts.votes, posts.header
          FROM posts JOIN users ON posts.poster_id = users.id
          JOIN subshreddits ON posts.subshreddit_id = subshreddits.id
          WHERE posts.poster_id=$1`, [userId])
          .then(data => {
            res.status(200).json({
              status: "success",
              message: "got all posts per user",
              posts: data
            })
          })
          .catch(err => next(err))
}

const getSavedPosts = (req, res, next) => {
  let userId = parseInt(req.params.userId)
  db.any(`SELECT users.username AS posted_by, saved_posts.id, posts.id AS post_id, posts.poster_id, posts.subshreddit_id, subshreddits.groupname, posts.created_at, posts.votes, posts.poster_id FROM posts
          JOIN saved_posts ON posts.id = saved_posts.post_id
          JOIN users ON posts.poster_id = users.id
          JOIN subshreddits ON posts.subshreddit_id = subshreddits.id
          WHERE saved_posts.user_id=$1`, [userId])
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "got all saved posts",
        saved_posts: data
      })
    })
    .catch(err => next(err))
}
const getCommentsPerUser = (req, res, next) => {
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

const createUser = (req, res, next) => {
  const hash = authHelpers.createHash(req.body.password);
  db.none(
    "INSERT INTO users (username, password_digest, avatar_url, email) VALUES (${username}, ${password_digest}, ${avatar_url}, ${email})",
    { username: req.body.username,
      password_digest: hash,
      avatar_url: `https://api.adorable.io/avatars/285/`+req.body.username,
      email: req.body.email
    }
  )
    .then(() => {
      res.status(200).json({ //same as doing res.send, but .json helps send a json ready to the client.
        message: "Registration successful."
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
}

const logoutUser = (req, res, next) => {
  req.logout();
  res.status(200).send("log out success");
}

const loginUser = (req, res) => {
  res.json(req.user.username);
}

const isLoggedIn = (req, res) => {
  if (req.user) {
    res.json({ username: req.user });
  } else {
    res.json({ username: null });
  }
}

module.exports = {
  getAllUsers,
  getOneUser,
  getPostsPerUser,
  getSavedPosts,
  getCommentsPerUser,
  createUser,
  logoutUser,
  loginUser,
  isLoggedIn
};
