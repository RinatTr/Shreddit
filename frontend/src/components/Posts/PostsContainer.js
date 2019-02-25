import Posts from "./Posts";
import { connect } from "react-redux";
import { fetchPosts, fetchCommentsPerPost } from "../../actions/PostActions";

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts.posts,
    comments: state.posts.comments
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchCommentsPerPost: (id) => dispatch(fetchCommentsPerPost(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
