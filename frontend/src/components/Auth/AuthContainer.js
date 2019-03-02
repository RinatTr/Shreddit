import AuthForm from "./AuthForm";
import { connect } from "react-redux";
import { signUpUser, loginUser, logoutUser, checkAuthenticateStatus } from "../../actions/AuthActions";


const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts.posts,
    comments: state.posts.comments,
    count: state.posts.comment_count
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
  null,
  mapDispatchToProps
)(AuthForm);
