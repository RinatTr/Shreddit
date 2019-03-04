// getUserPosts
// getSavedPosts
// getUserComments

import * as Util from '../util/util.js';

export const RECEIVE_USER_POSTS = "RECEIVE_USER_POSTS";

export const receiveUserPosts = (posts) => {
  return {
    type: RECEIVE_USER_POSTS,
    posts
  }
}

export const fetchUserPosts = (id) => dispatch => {
  return Util.getUserPosts(id)
              .then(res => {
                console.log(res);
                return dispatch(receiveUserPosts(res.data.posts))
              })
              .catch(err => {
                console.log(err);
              })
}
