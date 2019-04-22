import Navbar from "./Navbar";
import { connect } from "react-redux";
import { logoutUser, checkAuthenticateStatus } from "../../actions/AuthActions";
import { fetchFollows } from "../../actions/FollowActions";
import { fetchUserSavedPosts } from "../../actions/UserActions";

const mapStateToProps = (state, ownProps) => {
  console.log("state==>",state);
  return {
    loggedInUser: state.auth.loggedUser,
    authError: state.auth.error,
    follows: state.follows.follows,
    posts: state.posts.posts
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    checkAuthenticateStatus: () => dispatch(checkAuthenticateStatus()),
    fetchFollows: (userId) => dispatch(fetchFollows(userId)),
    fetchUserSavedPosts: (userId) => dispatch(fetchUserSavedPosts(userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
