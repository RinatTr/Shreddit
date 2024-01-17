import { RECEIVE_USER_POSTS, RECEIVE_USER, RECEIVE_USER_SAVED_POSTS, RECEIVE_USER_SUBSHREDDITS } from '../actions/UserActions.js';

const initialState = {
  posts: [],
  user: "",
  saved_posts: [],
  userSubshreddits: [],
};

const UserReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER_POSTS:
      return { ...state, posts: action.posts };
    case RECEIVE_USER:
      return { ...state, user: action.user };
    case RECEIVE_USER_SAVED_POSTS:
      return { ...state, saved_posts: action.savedPosts };
    case RECEIVE_USER_SUBSHREDDITS:
      return { ...state, userSubshreddits: action.userSubs };
    default:
      return state;
  }
};

export default UserReducer;
