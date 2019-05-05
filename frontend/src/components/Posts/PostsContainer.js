import Posts from "./Posts";
import { connect } from "react-redux";
import { fetchPosts } from "../../actions/PostActions.js";
import { fetchUserSavedPosts } from "../../actions/UserActions.js";
import { fetchCommentsPerPost, fetchCommentCount } from "../../actions/CommentActions.js";

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts.posts,
    comments: state.posts.comments,
    count: state.posts.comment_count,
    saved_posts: state.user_content.saved_posts,
    loggedUser: state.auth.loggedUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUserSavedPosts: (id) => dispatch(fetchUserSavedPosts(id)),
    fetchPosts: () => dispatch(fetchPosts()),
    fetchCommentsPerPost: (id) => dispatch(fetchCommentsPerPost(id)),
    fetchCommentCount: () => dispatch(fetchCommentCount())
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
