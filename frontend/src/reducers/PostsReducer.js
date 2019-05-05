import { RECEIVE_POSTS } from '../actions/PostActions.js';
import { RECEIVE_COMMENTS, RECEIVE_COMMENT_COUNT, ADD_COMMENT } from '../actions/CommentActions.js';

//  ./src/reducers/PostsReducer.js
// Cannot find file '../actions/PostActions.js' in './src/reducers'.

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
