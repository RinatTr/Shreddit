import { connect } from 'react-redux';
import Subshreddit from './Subshreddit';
import { fetchSubshredditPosts } from '../../actions/SubshredditActions';
import { fetchUserSavedPosts, fetchUser, fetchUserSubshreddits } from '../../actions/UserActions';
import { fetchCommentCount } from '../../actions/CommentActions';
import { fetchFollows } from '../../actions/FollowActions';

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.sub_content.posts,
    count: state.posts.comment_count,
    user: state.user_content.user,
    loggedUser: state.auth.loggedUser,
    saved_posts: state.user_content.saved_posts,
    subshreddits: state.user_content.userSubshreddits
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUserSavedPosts : (id) => dispatch(fetchUserSavedPosts(id)),
    fetchSubshredditPosts: (id) => dispatch(fetchSubshredditPosts(id)),
    fetchCommentCount: () => dispatch(fetchCommentCount()),
    fetchUser: (username) => dispatch(fetchUser(username)),
    fetchUserSubshreddits: (userId) => dispatch(fetchUserSubshreddits(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subshreddit)
