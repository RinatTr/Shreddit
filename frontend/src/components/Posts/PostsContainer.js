import Posts from "./Posts";
import { connect } from "react-redux";
import { fetchPosts } from "../../actions/PostActions";

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts,
    selectedId: ownProps.match.params.id
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchPosts: () => dispatch(fetchPosts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
