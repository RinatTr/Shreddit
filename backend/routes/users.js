const express = require('express');
const router = express.Router();
const { getAllUsers, getOneUser, getPostsPerUser, getSavedPosts, getCommentsPerUser } = require('../queries/q-users.js');
const db = require("../queries/q-users.js");
const passport = require("../auth/local.js");
const { loginRequired } = require("../auth/helpers");

// each request made to api/users/new => handled by db.createUser
router.post("/new", db.createUser); //middleware
router.post("/login", passport.authenticate("local", {}), db.loginUser);
router.get("/isLoggedIn", db.isLoggedIn);
router.post("/logout", loginRequired, db.logoutUser);

//position after auth to avoid clashing paths
router.get('/', getAllUsers)
router.get('/:username', getOneUser)
router.get('/:userId/posts', getPostsPerUser)
router.get('/:userId/posts/saved', getSavedPosts)
router.get('/:userId/comments', getCommentsPerUser)

//add loginRequired to each protected route
module.exports = router;
