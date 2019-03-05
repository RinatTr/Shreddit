import React, { Component } from 'react';

export default class User extends Component {
  constructor() {
    super()

  }

  componentDidMount() {
    this.props.fetchUserPosts(4)
  }
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <h1>REMOVE AFTER CSS</h1>
        <h1>ima user yo, yo. yo, yo.</h1>
      </React.Fragment>
    )
  }
}

//what does userprofile need from Redux store / db?
// auth: loggedInUser
// new reducer for user profile:
//
//new axios calls / routes:
// get all posts per currently viewed user
// get all comments per user
// get all saved posts per user

// * `GET /api/users/:userId/posts/`
//   * Fetches all posts by user
// * `GET /api/users/:userId/posts/saved`
//   * Fetches all saved posts by a user
// * `GET /api/users/:userId/comments`
//    * Fetches all comments by user

//no forms needed

//route user Profile in app.js

//display posts in same way as posts.js :
//  import PostDisplay, and map user_posts. when mapping <Link> each post to its id.
// correct the post Modal display (posts.js) to be using nested routing.
// have the posts/:id route in the main app.
