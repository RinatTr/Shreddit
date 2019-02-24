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


const createUser = (req, res, next) => {
  const hash = authHelpers.createHash(req.body.password);
  console.log("original password and username", req.body.password, req.body.username);
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
  createUser,
  logoutUser,
  loginUser,
  isLoggedIn
};
