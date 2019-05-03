import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Post from '../Posts/PostDisplay';
import SubInfo from './SubDisplay';
import { addSubscription, deleteSubscription, getASubshreddit, getAllSubshredditsPerUser } from '../../util/util';
import '../../css/Subshreddit.css';

export default class Subshreddit extends Component {
  constructor() {
    super()
    this.state = {
      isSubscribed: false,
      isLoggedUserPage: false,
      data: "",
      userSubshreddits: []
    }
    this.handleSubscribe = this.handleSubscribe.bind(this)
    this.handleUnsubscribe = this.handleUnsubscribe.bind(this)
  }

  validateSubscription = () => {
    if (this.props.loggedUser) {
      let loggedUserId = this.props.loggedUser.userData.id
      let { subId } = this.props.match.params
      getAllSubshredditsPerUser(loggedUserId)
          .then((res) => {
            let userSubshreddits = res.data.subshreddits
                if (userSubshreddits.find(sub => +sub.subshreddit_id === +subId)) {
                  this.setState({
                    isSubscribed: true,
                    userSubshreddits: res.data.subshreddits
                  })
                } else {
                  this.setState({
                    isSubscribed: false,
                    userSubshreddits: res.data.subshreddits
                  })
                }
              })
    }
  }

  async componentDidMount() {
    let { fetchSubshredditPosts, fetchCommentCount, match } = this.props;
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
  async handleSubscribe() {
    if (!this.props.loggedUser) {
      this.props.history.push('/auth/login/')
    } else {
      let subObj = {  subscriber_id: this.props.loggedUser.userData.id,
                      subshreddit_id: this.props.match.params.subId }

      await addSubscription(subObj).catch((err)=> console.log(err))
      this.validateSubscription()
    }
  }

  async handleUnsubscribe() {
    let { userSubshreddits } = this.state;
    let { subId } = this.props.match.params
    let subscriptionId = userSubshreddits.find(sub => +sub.subshreddit_id === +subId).subscription_id
    await deleteSubscription(subscriptionId).catch((err)=> console.log(err))
    this.validateSubscription()
  }

  render() {
    let { posts, count, loggedUser, saved_posts } = this.props;
    let { isLoggedUserPage, data, userSubshreddits } = this.state;
    let mapPosts;
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
                      handleSubscribe={this.handleSubscribe}
                      handleUnsubscribe={this.handleUnsubscribe}
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
