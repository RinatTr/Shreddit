import { combineReducers } from 'redux'
import PostsReducer from './PostsReducer';
import AuthReducer from './AuthReducer';

const rootReducer = combineReducers({
  posts: PostsReducer,
  auth: AuthReducer
})

export default rootReducer;

// component state for forms.
// util - different set of api calls in different file
// reducers have the same. sessions, errors - display to user.
