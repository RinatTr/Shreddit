import Navbar from "./Navbar";
import { connect } from "react-redux";
import { logoutUser, checkAuthenticateStatus } from "../../actions/AuthActions";
import { fetchFollows } from "../../actions/FollowActions";

const mapStateToProps = (state, ownProps) => {
  return {
    loggedInUser: state.auth.loggedUser,
    authError: state.auth.error,
    follows: state.follows.follows
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    checkAuthenticateStatus: () => dispatch(checkAuthenticateStatus()),
    fetchFollows: (userId) => dispatch(fetchFollows(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
