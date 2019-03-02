import Navbar from "./Navbar";
import { connect } from "react-redux";
import { logoutUser, checkAuthenticateStatus } from "../../actions/AuthActions";


const mapStateToProps = (state, ownProps) => {
  return {
    loggedInUser: state.auth.loggedUser,
    authError: state.auth.error
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    checkAuthenticateStatus: () => dispatch(checkAuthenticateStatus())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
