import { RECEIVE_SUBSHREDDIT_POSTS } from '../actions/SubshredditActions.js';

const initialState = {
  posts: [],
};

const SubshredditReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SUBSHREDDIT_POSTS:
      return { ...state, posts: action.posts };
    default:
      return state;
  }
};

export default SubshredditReducer;
