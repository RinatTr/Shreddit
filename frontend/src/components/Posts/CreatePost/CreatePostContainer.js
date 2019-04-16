import CreatePost from "./CreatePost";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  return {
    loggedUser: state.auth.loggedUser
  };
};


export default connect(
  mapStateToProps,
  null
)(CreatePost);
