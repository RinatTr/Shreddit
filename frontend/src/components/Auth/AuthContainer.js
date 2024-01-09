import AuthService from "./AuthService.js";
import { connect } from "react-redux";
import { signupUser, loginUser, logoutUser, checkAuthenticateStatus } from "../../actions/AuthActions.js";


const mapStateToProps = (state, ownProps) => {
  return {
    signedUpUser: state.auth.signedUpUser,
    loggedInUser: state.auth.loggedUser,
    authError: state.auth.error,
    authStatus: state.auth.statusCode
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signupUser: (newUser) => dispatch(signupUser(newUser)),
    loginUser: (user) => dispatch(loginUser(user)),
    logoutUser: () => dispatch(logoutUser()),
    checkAuthenticateStatus: () => dispatch(checkAuthenticateStatus())
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthService);
