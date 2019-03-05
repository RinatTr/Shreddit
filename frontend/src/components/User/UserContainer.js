import { connect } from 'react-redux';
import User from './User'
import { fetchUserPosts, fetchUser } from '../../actions/UserActions';
import { fetchCommentCount } from '../../actions/CommentActions';

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.user_content.posts,
    count: state.posts.comment_count,
    user: state.user_content.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUserPosts: (id) => dispatch(fetchUserPosts(id)),
    fetchCommentCount: () => dispatch(fetchCommentCount()),
    fetchUser: (username) => dispatch(fetchUser(username))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
