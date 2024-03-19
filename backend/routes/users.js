const express = require('express');
const router = express.Router();
const { getAllUsers, getOneUser, getPostsPerUser, getSavedPosts, addSavedPost, deleteSavedPost, getCommentsPerUser } = require('../queries/q-users.js');
const db = require("../queries/q-users.js");

const { loginRequired } = require("../auth/helpers");
const passport = require('passport');

// each request made to api/users/new => handled by db.createUser
router.post("/auth/new", db.createUser); //middleware
router.post("/auth/login", db.loginUser);

//Deprecated
// router.get("/auth/isLoggedIn",  db.isLoggedIn);

//in JWT there is no need for logout requests and it's enough to discard the token on client, as we are relying on the passport-jwt built-in expiration validation of the token.
router.post("/auth/logout", passport.authenticate('jwt', { session: false }), loginRequired, db.logoutUser);

//position after auth to avoid clashing paths
router.get('/', getAllUsers)
router.get('/:username', getOneUser)
router.get('/:userId/posts', getPostsPerUser)
router.get('/:userId/posts/saved', passport.authenticate('jwt', { session: false }), loginRequired, getSavedPosts)
router.post('/:userId/save', passport.authenticate('jwt', { session: false }), loginRequired, addSavedPost)
router.delete('/:userId/save', passport.authenticate('jwt', { session: false }), loginRequired, deleteSavedPost)
router.get('/:userId/comments', getCommentsPerUser)

//add loginRequired to each protected route
module.exports = router;
