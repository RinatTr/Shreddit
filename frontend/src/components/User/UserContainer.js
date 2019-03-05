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
