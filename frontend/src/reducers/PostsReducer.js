import { RECEIVE_POSTS } from '../actions/PostActions';
import { RECEIVE_COMMENTS, RECEIVE_COMMENT_COUNT, ADD_COMMENT } from '../actions/CommentActions';

// const normalizeData = arr => {
//   let obj = {};
//   arr.forEach(item => {
//     obj[item.id] = item;
//   });
//   return obj
// }

const PostsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_POSTS:
      return {...oldState, posts: action.posts}
    case RECEIVE_COMMENTS:
      return {...oldState, comments: action.comments}
    case RECEIVE_COMMENT_COUNT:
      return {...oldState, comment_count: action.commentCount}
    case ADD_COMMENT:
      return {...oldState, added_comment: action.comment}
    default:
      return oldState
  }
}

export default PostsReducer;
