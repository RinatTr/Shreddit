const express = require('express');
const router = express.Router();
const { getAllUsers, getOneUser, getPostsPerUser, getSavedPosts, addSavedPost, deleteSavedPost, getCommentsPerUser } = require('../queries/q-users.js');
const db = require("../queries/q-users.js");
const passport = require("../auth/local.js");
const { loginRequired } = require("../auth/helpers");

// each request made to api/users/new => handled by db.createUser
router.post("/auth/new", db.createUser); //middleware
router.post("/auth/login", passport.authenticate("local", {}), db.loginUser);
router.get("/auth/isLoggedIn", db.isLoggedIn);
router.post("/auth/logout", loginRequired, db.logoutUser);

//position after auth to avoid clashing paths
router.get('/', getAllUsers)
router.get('/:username', getOneUser)
router.get('/:userId/posts', getPostsPerUser)
router.get('/:userId/posts/saved', loginRequired, getSavedPosts)
router.post('/:userId/save', loginRequired, addSavedPost)
router.delete('/:userId/save', loginRequired, deleteSavedPost)
router.get('/:userId/comments', getCommentsPerUser)

//add loginRequired to each protected route
module.exports = router;
