import { RECEIVE_POSTS } from '../actions/PostActions.js';
import { RECEIVE_COMMENTS, RECEIVE_COMMENT_COUNT, ADD_COMMENT } from '../actions/CommentActions.js';

const initialState = {
  posts: [],
  comments: [],
  comment_count: null,
  added_comment: null,
};

const PostsReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_POSTS:
      return { ...state, posts: action.posts };
    case RECEIVE_COMMENTS:
      return { ...state, comments: action.comments };
    case RECEIVE_COMMENT_COUNT:
      return { ...state, comment_count: action.commentCount };
    case ADD_COMMENT:
      return { ...state, added_comment: action.comment };
    default:
      return state;
  }
};

export default PostsReducer;
