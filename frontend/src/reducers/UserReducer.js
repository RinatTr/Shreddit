import { RECEIVE_USER_POSTS, RECEIVE_USER, RECEIVE_USER_SAVED_POSTS, RECEIVE_USER_SUBSHREDDITS } from '../actions/UserActions';

const UserReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_USER_POSTS:
      return {...oldState, posts: action.posts}
    case RECEIVE_USER:
      return {...oldState, user: action.user}
    case RECEIVE_USER_SAVED_POSTS:
      return {...oldState, saved_posts: action.savedPosts}
    case RECEIVE_USER_SUBSHREDDITS:
      return {...oldState, userSubshreddits: action.userSubs}
    default:
      return oldState
  }
}

export default UserReducer;
