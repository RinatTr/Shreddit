import Navbar from "./Navbar.js";
import { connect } from "react-redux";
import { logoutUser, checkAuthenticateStatus } from "../../actions/AuthActions.js";
import { fetchFollows } from "../../actions/FollowActions.js";
import { fetchUserSavedPosts, fetchUserSubshreddits } from "../../actions/UserActions.js";

const mapStateToProps = (state, ownProps) => {
  return {
    loggedInUser: state.auth.loggedUser,
    authError: state.auth.error,
    follows: state.follows.follows,
    posts: state.posts.posts,
    subshreddits: state.user_content.userSubshreddits
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    checkAuthenticateStatus: () => dispatch(checkAuthenticateStatus()),
    fetchFollows: (userId) => dispatch(fetchFollows(userId)),
    fetchUserSavedPosts: (userId) => dispatch(fetchUserSavedPosts(userId)),
    fetchUserSubshreddits: (userId) => dispatch(fetchUserSubshreddits(userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
