import { connect } from 'react-redux';
import User from './User'
import { fetchUserPosts, fetchUser } from '../../actions/UserActions';
import { fetchCommentCount } from '../../actions/CommentActions';
import { fetchFollows } from '../../actions/FollowActions';

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.user_content.posts,
    count: state.posts.comment_count,
    user: state.user_content.user,
    loggedUser: state.auth.loggedUser,
    follows: state.follows.follows
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUserPosts: (id) => dispatch(fetchUserPosts(id)),
    fetchCommentCount: () => dispatch(fetchCommentCount()),
    fetchUser: (username) => dispatch(fetchUser(username)),
    fetchFollows: (userId) => dispatch(fetchFollows(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
