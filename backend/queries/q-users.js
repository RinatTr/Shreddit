const { db } = require("./q-index.js");

const authHelpers = require("../auth/helpers");
var jwt = require('jsonwebtoken');
require('dotenv').config();

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
  db.one("SELECT id, username, avatar_url, created_at FROM users WHERE username=$1", [username])
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
          WHERE posts.poster_id=$1
          ORDER BY posts.votes DESC`, [userId])
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
  db.any(`SELECT users.username AS posted_by, saved_posts.id, posts.id AS post_id, posts.poster_id, posts.subshreddit_id, subshreddits.groupname, posts.created_at, posts.votes, posts.poster_id, posts.header FROM posts
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

const addSavedPost = (req, res, next) => {
  let userId = parseInt(req.params.userId)
  db.none(`INSERT INTO saved_posts(user_id, post_id) VALUES($1, $2)`,[userId, req.body.postId])
    .then(data => {
      res.status(200).json({
        status:"success",
        message: "saved a post for user_id "+userId
      })
    })
    .catch(err => next(err))
}
const deleteSavedPost = (req, res, next) => {
  let userId = parseInt(req.params.userId)
  db.none(`DELETE FROM saved_posts WHERE user_id=$1 AND post_id=$2`,[userId, req.body.postId])
    .then(data => {
      res.status(200).json({
        status:"success",
        message: "deleted a save for a post for user_id "+userId
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
      avatar_url: `https://robohash.org/${req.body.username}?size=100x100`,
      email: req.body.email
    }
  )
    .then(() => {
      res.status(200).json({ //same as doing res.send, but .json helps send a json ready to the client.
        message: "Registration successful."
      });
    })
    .catch(err => {
      if (err.code == "23505") {
        res.status(409).json({
          message: `Registration failed: username or email already exists.`
        })
      } else {
        res.status(500).json({
          message: `Registration failed: Internal server error.`
        })
      }
      
    });
}

const logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).send('Error logging out');
    }
    res.status(200).send('Logged out successfully');
  });
};

const loginUser = (req, res, next) => {
  console.log('[AUTH:] in loginUser query');
  //look for user in the DB, .then() =>
  db.one("SELECT * FROM users WHERE username = ${username}", {
    username: req.body.username
  })
    .then(user => {       
        if (!authHelpers.comparePass(req.body.password, user.password_digest)) {
          console.log('[AUTH:] password from client does not match decrypted password')
          //password from client does not match decrypted password
            return res.status(401).json({
                message: "Incorrect credentials"
            })
        } else {
            const payload = {
                username: user.username,
                id: user.id
            }
            //authentication success - generate a JWT token
            const token = jwt.sign(payload, process.env.SECRET_JWT, { expiresIn: "1d" })
            // TODO: client used to receive successful login as such // res.json(req.user.username);
            return res.status(200).json({
                message: "Logged in successfully!",
                token: "Bearer " + token,
                username: user.username
            })
        }
    }).catch(err => {
      console.log("err.code", err.code, err)
      if (err.code == "0") {
        //error code 0 = no data returned from DB query, meaning username doesn't exist
        res.status(401).json({
          message: `Incorrect credentials`
        })
      } else {
        res.status(500).json({
          message: `Registration failed: Internal server error.`
        })
      }
    });
}

module.exports = {
  getAllUsers,
  getOneUser,
  getPostsPerUser,
  getSavedPosts,
  addSavedPost,
  deleteSavedPost,
  getCommentsPerUser,
  createUser,
  logoutUser,
  loginUser
};
