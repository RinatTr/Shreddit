import * as Util from '../util/util.js';
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";

export const receivePosts = posts => {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

export const receiveComments = comments => {
  return {
    type: RECEIVE_COMMENTS,
    comments
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

export const fetchCommentsPerPost = (id) => dispatch => {
  return Util.getCommentsPerPost(id)
              .then(res => {
                return dispatch(receiveComments(res.data.comments))
              }).catch(err => {
                console.log(err);
              })
}
