import AddComment from "./AddComment";
import { connect } from "react-redux";
import { postComment, fetchCommentsPerPost } from "../../actions/CommentActions";

const mapStateToProps = (state, ownProps) => {
  return {
    added_comment: state.posts.added_comment,
    loggedUser: state.auth.loggedUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    postComment: (comment, id) => dispatch(postComment(comment, id)),
    fetchCommentsPerPost: (postId) => dispatch(fetchCommentsPerPost(postId))
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddComment);
