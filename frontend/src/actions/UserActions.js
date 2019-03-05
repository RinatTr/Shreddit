// getUserPosts
// getSavedPosts
// getUserComments

import * as Util from '../util/util.js';

export const RECEIVE_USER_POSTS = "RECEIVE_USER_POSTS";
export const RECEIVE_USER = "RECEIVE_USER";

export const receiveUserPosts = (posts) => {
  return {
    type: RECEIVE_USER_POSTS,
    posts
  }
}

export const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user
  }
}

export const fetchUser = (username) => dispatch => {
  return Util.getUser(username)
              .then(res => {
                return dispatch(receiveUser(res.data.user))
              })
              .catch(err => {
                console.log(err);
              })
}

export const fetchUserPosts = (id) => dispatch => {
  return Util.getUserPosts(id)
              .then(res => {
                return dispatch(receiveUserPosts(res.data.posts))
              })
              .catch(err => {
                console.log(err);
              })
}
