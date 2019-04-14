import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Post from '../Posts/PostDisplay';
import UserInfo from './UserDisplay';
import UserNav from './UserNav';
import { addFollow, deleteFollow } from '../../util/util';
import '../../css/User.css';

export default class User extends Component {
  constructor() {
    super()
    this.state = {
      isSubscribed: false,
      isLoggedUserPage: false
    }
    this.handleFollow = this.handleFollow.bind(this)
    this.handleUnfollow = this.handleUnfollow.bind(this)
  }

  validateSubscription = () => {
    if (this.props.loggedUser) {
      let loggedUserId = this.props.loggedUser.userData.id
      let userPageId = this.props.user.id
      this.props.fetchFollows(loggedUserId)
                  .then(() => {
                    //if identical id's then set subscribed true
                    if (this.props.follows.find(follow => follow.followed_id === userPageId)) {
                      this.setState({
                        isSubscribed: true
                      })
                    } else {
                      this.setState({
                        isSubscribed: false
                      })
                    }
                  })
    }
  }

  async componentDidMount() {
    let { fetchUser, fetchUserPosts, fetchCommentCount, match } = this.props;
    await fetchUser(match.params.username)
    await fetchUserPosts(this.props.user.id)
    await fetchCommentCount()
    if (this.props.loggedUser) {
      if (this.props.loggedUser.username === this.props.user.username) {
        this.setState({
          //"false" will remain default since logout refreshes the page.
          isLoggedUserPage: true
        })
      }
    }
    this.validateSubscription()
  }

  async componentDidUpdate(prevProps) {
  if (this.props.match.params.username !== prevProps.match.params.username) {
    await this.props.fetchUser(this.props.match.params.username)
    await this.props.fetchUserPosts(this.props.user.id)
    await this.props.fetchCommentCount()
  }
}
  //handle data
  countPerPost = (id, count) => {
    if (count) {
      let post = count.find(post => post.post_id === +id)
      return post ? post.comments_count : "0";
    }
  }

  isSaved = (postId) => {
    return this.props.saved_posts.find(savedPost => savedPost.post_id === postId) ? true : false;
  }

  //handle user input
  async handleFollow() {
    if (!this.props.loggedUser) {
      this.props.history.push('/auth/login/')
    } else {
      let followObj = { follower_id: this.props.loggedUser.userData.id,
                        followed_id: this.props.user.id }

      await addFollow(followObj).catch((err)=> console.log(err))
      this.props.fetchFollows(followObj.follower_id)
      this.validateSubscription()
    }
  }

  async handleUnfollow() {
    //user is definitely logged in
      let userPageId = this.props.user.id
      let followObj = this.props.follows.find(follow => follow.followed_id === userPageId)
      await deleteFollow(followObj.id).catch((err)=> console.log(err))
      await this.props.fetchFollows(followObj.follower_id)
      this.validateSubscription()
  }

  render() {
    let { posts, count, match, user, loggedUser, saved_posts } = this.props;
    let { isLoggedUserPage} = this.state;
    let mapPosts;
    let currentPost;
    if (Array.isArray(posts) && count && ((loggedUser && saved_posts) || (!loggedUser && saved_posts === undefined))) {
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
                  isSaved={loggedUser ? this.isSaved(post.id) : false}
                /></Link>
      })
      currentPost = match.params.id ? posts.find(post => post.id === + match.params.id) : null;
    }
    return (
      <React.Fragment>
        {/*isLoggedUserPage ? <UserNav loggedUser={loggedUser}/> : null*/}
        <div className="user-page">
          {mapPosts ? <div className="user-posts-container">{mapPosts}</div> : ""}
          {user ? <UserInfo
                    username={user.username}
                    avatar={user.avatar_url}
                    handleFollow={this.handleFollow}
                    handleUnfollow={this.handleUnfollow}
                    isSubscribed={this.state.isSubscribed}
                    cakeDay={user.created_at}
                  /> : null}
        </div>
      </React.Fragment>
    )
  }
}

//display posts in same way as posts.js :
//  import PostDisplay, and map user_posts. when mapping <Link> each post to its id.
// correct the post Modal display (posts.js) to be using nested routing.
// have the posts/:id route in the main app.
