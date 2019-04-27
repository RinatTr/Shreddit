import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Post from '../Posts/PostDisplay';
import SubInfo from './SubDisplay';
import { addFollow, deleteFollow, getASubshreddit } from '../../util/util';
import '../../css/Subshreddit.css';

export default class Subshreddit extends Component {
  constructor() {
    super()
    this.state = {
      isSubscribed: false,
      isLoggedUserPage: false,
      data: ""
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
    let { fetchSubshredditPosts, fetchUserPosts, fetchCommentCount, match } = this.props;
    await fetchSubshredditPosts(match.params.subId)
    await fetchCommentCount()
    const res = await getASubshreddit(match.params.subId)
    this.setState({
      data: res.data.subshreddit
    })
    this.validateSubscription()
  }

  async componentDidUpdate(prevProps) {
  if (this.props.match.params.subname !== prevProps.match.params.subname) {
    await this.props.fetchUser(this.props.match.params.username)
    await this.props.fetchSubshredditPosts(this.props.match.params.subname)
    await this.props.fetchCommentCount()
    if (this.props.loggedUser) {
      let boolean = this.props.loggedUser.username === this.props.user.username
        this.setState({
          isLoggedUserPage: boolean
        })
    }
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
    let { posts, count, match, user, loggedUser, saved_posts, location } = this.props;
    let { isLoggedUserPage, data } = this.state;
    let mapPosts;
    //saved feature for loggedUser page only

    if (Array.isArray(posts) && count && ((loggedUser && saved_posts) || (!loggedUser && saved_posts === undefined))) {
       mapPosts = posts.map((post) => {
        return <Link key={post.id} to={`/post/${post.id}`}>
                <Post
                  key={post.id}
                  id={post.id}
                  commentCount={this.countPerPost(post.id, count)}
                  votes={post.votes}
                  timestamp={post.created_at}
                  header={post.header}
                  body={post.body}
                  username={post.username}
                  groupname={post.groupname}
                  groupId={post.subshreddit_id}
                  groupImgUrl={post.img_url}
                  isSaved={loggedUser ? this.isSaved(post.id) : false}
                /></Link>
      })
    }
    return (
      <React.Fragment>
        <div className="sub-page">
        <h4>/s/{data.groupname}</h4>
          <div className="sub-content">
            {mapPosts ? <div className="sub-posts-container">{mapPosts}</div> : ""}
            {data ? <SubInfo
                      subname={data.groupname}
                      avatar={data.img_url}
                      handleFollow={this.handleFollow}
                      handleUnfollow={this.handleUnfollow}
                      isSubscribed={this.state.isSubscribed}
                      isLoggedUserPage={isLoggedUserPage}
                    /> : null }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

// display group info
// handle subscribe
// populate menu with user subscriptions
