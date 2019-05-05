import { combineReducers } from 'redux'
import PostsReducer from './PostsReducer.js';
import AuthReducer from './AuthReducer.js';
import UserReducer from './UserReducer.js';
import FollowsReducer from './FollowsReducer.js';
import SubshredditReducer from './SubshredditReducer.js';

const rootReducer = combineReducers({
  posts: PostsReducer,
  auth: AuthReducer,
  user_content: UserReducer,
  follows: FollowsReducer,
  sub_content: SubshredditReducer
})

export default rootReducer;

// component state for forms.
// util - different set of api calls in different file
// reducers have the same. sessions, errors - display to user.
