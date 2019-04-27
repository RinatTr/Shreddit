import * as Util from '../util/util.js';

export const RECEIVE_SUBSHREDDIT_POSTS = "RECEIVE_SUBSHREDDIT_POSTS";

export const receiveSubshredditPosts = (posts) => {
  return {
    type: RECEIVE_SUBSHREDDIT_POSTS,
    posts
  }
}

export const fetchSubshredditPosts = (id) => dispatch => {
  return Util.getSubshredditPosts(id)
              .then(res => {
                return dispatch(receiveSubshredditPosts(res.data.posts))
              })
              .catch(err => {
                console.log(err);
              })
}
