import * as Util from '../util/util.js';
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_COMMENT_COUNT = "RECEIVE_COMMENT_COUNT";
export const ADD_COMMENT = "ADD_COMMENT";

export const receiveComments = comments => {
  return {
    type: RECEIVE_COMMENTS,
    comments
  }
}

export const receiveCommentCount = commentCount => {
  return {
    type: RECEIVE_COMMENT_COUNT,
    commentCount
  }
}

export const addComment = comment => {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export const fetchCommentsPerPost = (id) => dispatch => {
  return Util.getCommentsPerPost(id)
              .then(res => {
                return dispatch(receiveComments(res.data.comments))
              }).catch(err => {
                console.log(err);
              })
}

export const fetchCommentCount = () => dispatch => {
  return Util.getCommentCount()
              .then(res => {
                return dispatch(receiveCommentCount(res.data.counts))
              }).catch(err => {
                console.log(err);
              })
}

export const postComment = (comment, id) => dispatch => {
  return Util.postComment(comment, id)
              .then(() => {
                return dispatch(addComment(addComment(comment)))
              }).catch(err => {
                console.log(err)
              })
}
