import AuthForm from "./AuthForm.js";
import { connect } from "react-redux";
import { signUpUser, loginUser, logoutUser, checkAuthenticateStatus } from "../../actions/AuthActions.js";


const mapStateToProps = (state, ownProps) => {
  return {
    signedUpUser: state.auth.signedUpUser,
    loggedInUser: state.auth.loggedUser,
    authError: state.auth.error
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signUpUser: (newUser) => dispatch(signUpUser(newUser)),
    loginUser: (user) => dispatch(loginUser(user)),
    logoutUser: () => dispatch(logoutUser()),
    checkAuthenticateStatus: () => dispatch(checkAuthenticateStatus())
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthForm);
