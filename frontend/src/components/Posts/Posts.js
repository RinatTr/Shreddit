import React, { Component } from "react";
import { Route } from 'react-router-dom';
import axios from 'axios';
import Post from './PostDisplay'
import '../../css/Posts.css'

export default class Posts extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchPosts()
  }

  handleVote = (e) => {
    let post_id = e.target.id;
    let type = e.target.alt;
    axios.patch(`/api/posts/${post_id}`, { type: type })
    this.props.fetchPosts()
  }

  render() {
    let { posts } = this.props;
    let mapPosts;

    if (Array.isArray(posts)) {
       mapPosts = posts.map(post => {
        return <Post
                  key={post.id}
                  id={post.id}
                  votes={post.votes}
                  timestamp={post.created_at}
                  header={post.header}
                  body={post.body}
                  username={post.username}
                  groupname={post.groupname}
                  group_img_url={post.img_url}
                  handleVote={this.handleVote}
                />
      }).sort((a,b) => b.props.votes-a.props.votes)
    }

    return (
      <div className="posts">
      <h4>{this.props.match.path}</h4>
      {mapPosts ? mapPosts : ""}
      </div>
    );
  }
}
