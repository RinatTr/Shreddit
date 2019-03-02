import Posts from "./Posts";
import { connect } from "react-redux";
import { fetchPosts } from "../../actions/PostActions";
import { fetchCommentsPerPost, fetchCommentCount } from "../../actions/CommentActions";

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts.posts,
    comments: state.posts.comments,
    count: state.posts.comment_count
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchCommentsPerPost: (id) => dispatch(fetchCommentsPerPost(id)),
    fetchCommentCount: () => dispatch(fetchCommentCount())
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
