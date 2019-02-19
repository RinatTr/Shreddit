import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

const Home = (props) => {
  const { posts } = props;
  const mapPosts = posts.map(post => {
    return <Link key={post.id} to={'/' + post.id}>
             <div>
               <span>{post.title}</span>
               <p>{post.body}</p>
            </div>
            </Link>
          })

  return (
    <React.Fragment>
      <h3>All Posts</h3>
      {mapPosts}
    </React.Fragment>
  )
}

//makes the state available as props
const mapStateToProps = (state) => {
  return {
    posts: state.posts //creates a posts prop
  }
}

export default connect(mapStateToProps)(Home)
//connect() returns the HOC, and then the HOC wraps the HOME component.
//connects us to the store
