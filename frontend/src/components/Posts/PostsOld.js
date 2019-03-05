import React, { Component } from "react";
import axios from 'axios';
import Post from './PostDisplay'
import PostModal from './PostModal'
import '../../css/Posts.css'

export default class Posts extends Component {
  constructor() {
    super()
    this.state = {
      currentPostId: "",
      isOpen: false,
      lastRoute: ""
    }
    this.handleExpand = this.handleExpand.bind(this)
  }

  componentDidMount() {
    let { fetchPosts, fetchCommentCount } = this.props;
    fetchPosts();
    fetchCommentCount();
  }
  //handle UI
  handleVote = (e) => {
    if (e.target.name === "vote-comment") {
      let postId = e.target.parentElement.id;
      let comment_id = e.target.id;
      let type = e.target.alt;
      axios.patch(`/api/comments/${comment_id}`, { type: type })
      this.props.fetchCommentsPerPost(postId)
    } else {
      let post_id = e.target.id;
      let type = e.target.alt;
      axios.patch(`/api/posts/${post_id}`, { type: type })
      this.props.fetchPosts()
    }
  }

  async handleExpand(e) {
    let dontToggle = ["upvote","downvote","close"]
    if (!dontToggle.includes(e.target.className) && e.target.innerText !== "CLOSE") {
      let postId = e.currentTarget.id;
      this.props.fetchCommentsPerPost(postId)
                .then(() => {
                  this.setState({ currentPostId: postId,
                                  isOpen: true,
                                  lastRoute: this.props.match.path})
                  this.props.history.push('/post/' + postId);
                })
    }
    if (e.target.className === "close" || e.target.innerText === "CLOSE") {
      this.setState({ isOpen: false})
      this.props.history.push(this.state.lastRoute); //fix needed - only works if route before was not another post.
    }
  }

  //handleData
  countPerPost = (id, count) => {
    if (count) {
      let post = count.find(post => post.post_id === +id)
      return post ? post.comments_count : "0";
    }
  }

  render() {
    let { posts, comments, count, match } = this.props;
    let { currentPostId, isOpen } = this.state;
    let mapPosts;
    let currentPost;

    if (Array.isArray(posts) && count) {
       mapPosts = posts.map(post => {
        return <Post
                  key={post.id}
                  id={post.id}
                  commentCount={this.countPerPost(post.id, count)}
                  votes={post.votes}
                  timestamp={post.created_at}
                  header={post.header}
                  body={post.body}
                  username={post.username}
                  groupname={post.groupname}
                  groupImgUrl={post.img_url}
                  handleVote={this.handleVote}
                  handleExpand={this.handleExpand}
                />
      })

      currentPost = match.params.id ? posts.find(post => post.id === + match.params.id) : null;
    }

    return (
      <div className="posts">
        <h4>{match.path}</h4>
        {match.params.id && currentPostId && isOpen
          ? <PostModal
              id={currentPost.id}
              votes={currentPost.votes}
              timestamp={currentPost.created_at}
              header={currentPost.header}
              body={currentPost.body}
              username={currentPost.username}
              groupname={currentPost.groupname}
              groupImgUrl={currentPost.img_url}
              handleVote={this.handleVote}
              handleExpand={this.handleExpand}
              comments={comments}
              commentCount={this.countPerPost(currentPost.id, count)}
            />
          : null}
        {mapPosts ? mapPosts : null}
      </div>
    );
  }
}
