import { RECEIVE_SUBSHREDDIT_POSTS } from '../actions/SubshredditActions.js';

const SubshredditReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_SUBSHREDDIT_POSTS:
      return {...oldState, posts: action.posts}
    default:
      return oldState
  }
}

export default SubshredditReducer;
