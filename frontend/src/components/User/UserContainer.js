import { connect } from 'react-redux';
import User from './User'
import { fetchUserPosts, fetchUserSavedPosts, fetchUser } from '../../actions/UserActions.js';
import { fetchCommentCount } from '../../actions/CommentActions.js';
import { fetchFollows } from '../../actions/FollowActions.js';

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.user_content.posts,
    count: state.posts.comment_count,
    user: state.user_content.user,
    loggedUser: state.auth.loggedUser,
    follows: state.follows.follows,
    saved_posts: state.user_content.saved_posts
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUserSavedPosts : (id) => dispatch(fetchUserSavedPosts(id)),
    fetchUserPosts: (id) => dispatch(fetchUserPosts(id)),
    fetchCommentCount: () => dispatch(fetchCommentCount()),
    fetchUser: (username) => dispatch(fetchUser(username)),
    fetchFollows: (userId) => dispatch(fetchFollows(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
