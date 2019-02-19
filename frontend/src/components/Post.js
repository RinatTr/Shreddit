import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../actions/postActions'

const Post = (props) => {
  const { post } = props;

  const handleClick = (event) => {
    props.deletePost(props.post.id)
    props.history.push('/') //FE redirect to homepage (all posts)
  }
    return (
      <React.Fragment>
        <h4>{post.title}</h4>
        <p>{post.body}</p>
        <button onClick={handleClick}>Delete</button>
      </React.Fragment>
    )
}

//makes the state available as props
const mapStateToProps = (state, ownProps) => {
  //ownProps argument makes the current Post component's props
  //available here
  let id = ownProps.match.params.post_id;
  return {
    post: state.posts.find(post => post.id === id)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //dispatch expects an action obj. deletePost returns one. 
    deletePost: (id) => { dispatch(deletePost(id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
//connect() returns the HOC, and then the HOC wraps the HOME component.
//connects us to the store
