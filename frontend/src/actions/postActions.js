import * as Util from '../util/util.js';
export const RECEIVE_POSTS = "RECEIVE_POSTS";

export const receivePosts = posts => {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

export const fetchPosts = () => dispatch => {
  return Util.getPosts()
            .then(res => {
              return dispatch(receivePosts(res.data.posts))
            })
            .catch(err => {
              console.log(err)
            })
};
