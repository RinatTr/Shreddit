import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Post from '../Posts/PostDisplay';
import UserInfo from './UserDisplay';
import '../../css/User.css';

export default class User extends Component {
  constructor() {
    super()

  }

  async componentDidMount() {
    await this.props.fetchUser(this.props.match.params.username)
    this.props.fetchUserPosts(this.props.user.id)
    this.props.fetchCommentCount()
  }

  // async componentDidUpdate() {
  //   await this.props.fetchUser(this.props.match.params.username)
  //   this.props.fetchUserPosts(this.props.user.id)
  //   this.props.fetchCommentCount()
  // }

//   componentDidUpdate(prevProps) {
//   // Typical usage (don't forget to compare props):
//   if (this.props.userID !== prevProps.userID) {
//     this.fetchData(this.props.userID);
//   }
// }

  countPerPost = (id, count) => {
    if (count) {
      let post = count.find(post => post.post_id === +id)
      return post ? post.comments_count : "0";
    }
  }
  render() {
    let { posts, count, match, user } = this.props;
    let mapPosts;
    let currentPost;

    if (Array.isArray(posts) && count) {
       mapPosts = posts.map((post) => {
        return <Link key={post.id} to={`/post/${post.id}`}><Post
                  key={post.id}
                  id={post.id}
                  commentCount={this.countPerPost(post.id, count)}
                  votes={post.votes}
                  timestamp={post.created_at}
                  header={post.header}
                  body={post.body}
                  username={this.props.match.params.username}
                  groupname={post.groupname}
                  groupImgUrl={post.img_url}
                  handleVote={this.handleVote}
                  handleExpand={this.handleExpand}
                /></Link>
      })
      currentPost = match.params.id ? posts.find(post => post.id === + match.params.id) : null;
    }
    return (
      <React.Fragment>
        <div className="user-page">
          {mapPosts ? <div className="user-posts-container">{mapPosts}</div> : ""}
          {user ? <UserInfo
                    username={user.username}
                    avatar={user.avatar_url}
                  /> : null}
        </div>
      </React.Fragment>
    )
  }
}
//get snapshot before update - lifecycle method

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
