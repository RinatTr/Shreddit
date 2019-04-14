import React, { Component } from "react";
import axios from 'axios';
import Post from './PostDisplay'
import PostModal from './PostModal'
import { Link } from 'react-router-dom'
import '../../css/Posts.css'

export default class Posts extends Component {
  constructor() {
    super()
    this.state = {
      currentPostId: ""
    }
    this.handleExpand = this.handleExpand.bind(this)
  }

  async componentDidMount() {
    let { fetchPosts, fetchCommentCount, fetchCommentsPerPost, match } = this.props;
    const posts = await fetchPosts();
    const count = await fetchCommentCount();
    if (match.params.id) {
        const comments = await fetchCommentsPerPost(match.params.id);
      }
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

  handleSave = (e) => {
    let { loggedUser, fetchUserSavedPosts } = this.props;
    if (loggedUser) {
      if (e.target.className === "save-container") {
        axios.post(`/api/users/${loggedUser.userData.id}/save`, {postId : e.target.id})
      } else {
        axios.delete(`/api/users/${loggedUser.userData.id}/save`, { data: {postId : e.target.id} }) //delete requests use config.data to add req.body
      }
      fetchUserSavedPosts(loggedUser.userData.id)
    }
  }

  async handleExpand(e) {
    let dontToggle = ["upvote","downvote","close","username","saved-container","save-container"]
    if (!dontToggle.includes(e.target.className) && e.target.innerText !== "CLOSE") {
      let postId = e.currentTarget.id;
      this.props.fetchCommentsPerPost(postId).then(() => {
        this.props.history.push('/post/' + postId);
      })
    }
    if (e.target.className === "close" || e.target.innerText === "CLOSE") {
      this.props.history.goBack();
    }
  }

  //handleData
  countPerPost = (id, count) => {
    if (count) {
      let post = count.find(post => post.post_id === +id)
      return post ? post.comments_count : "0";
    }
  }

  isSaved = (postId) => {
    return this.props.saved_posts.find(savedPost => savedPost.post_id === postId) ? true : false;
  }

  render() {
    let { posts, comments, count, match, saved_posts } = this.props;
    let mapPosts;
    let currentPost;
    console.log(this.props);
    if (Array.isArray(posts) && count && saved_posts) {
      //collapsed posts rendering
       mapPosts = posts.map((post) => {
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
                  handleSave={this.handleSave}
                  isSaved={this.isSaved(post.id)}
                />
      })
      currentPost = match.params.id ? posts.find(post => post.id === + match.params.id) : null;
    }

    return (
      //single post (modal) rendering
      <div className="posts">
        <h4>{match.path}</h4>
        {match.params.id && currentPost && comments && count
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
              isSaved={this.isSaved(currentPost.id)}
              comments={comments}
              commentCount={this.countPerPost(currentPost.id, count)}
            />
          : null}
          {/*collapsed posts rendering*/}
        {mapPosts ? mapPosts : null}
      </div>
    );
  }
}
