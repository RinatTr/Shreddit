//what does userprofile need from Redux store / db?
// auth: loggedInUser
// new reducer for user profile:
//
//new axios calls / routes:
// get all posts per currently viewed user
// get all comments per user
// get all saved posts per user

// * `GET /api/users/:userId/posts/`
//   * Fetches all posts by user
// * `GET /api/users/:userId/posts/saved`
//   * Fetches all saved posts by a user
// * `GET /api/users/:userId/comments`
//    * Fetches all comments by user

//no forms needed

//route user Profile in app.js

//display posts in same way as posts.js :
//  import PostDisplay, and map user_posts. when mapping <Link> each post to its id.
// correct the post Modal display (posts.js) to be using nested routing.
// have the posts/:id route in the main app.

import { connect } from 'react-redux';
import User from './User'
import { fetchUserPosts } from '../../actions/UserActions';

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.user_content.posts
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUserPosts: (id) => dispatch(fetchUserPosts(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
