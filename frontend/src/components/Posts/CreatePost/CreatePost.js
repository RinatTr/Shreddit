import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import { createPost } from '../../../util/util.js';

export default class CreatePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      body: "",
      title: "",
      communityId: 24
    }
  }

  //needs : GET communities loggedUser is subscribed to, POST a post.
  // loggedUser - need container.
  handleSelect = (e) => {

  }

  handleTitle = (e) => {
    this.setState({
      title: e.target.value
    })
  }
  handleChange = (e) => {
    //Special Quill configuration:
    this.setState({
      body: e
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    let { loggedUser} = this.props;
    let { body, title, communityId } = this.state;
    //conditional to prevent empty "enter" submit
    if (body && title && loggedUser, communityId) {
      createPost({ poster_id: loggedUser.userData.id,
                              subshreddit_id: communityId,
                              votes: 0,
                              header: title,
                              body})
                          //redirect to user page / posted.
                  .catch((err) => console.log(err))
    }
  }

  modules = {
   toolbar: [
     [{ 'header': [1, 2, false] }],
     ['bold', 'italic','strike', 'blockquote'],
     [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
     ['link'],
     ['clean']
   ]
 }

  render() {
    let { loggedUser } = this.props;
    let { body, title } = this.state;
    return (
      loggedUser
      ? <div className="comment-add">
      <h1>push</h1>
        <span>Create a Post as <div className="comment-username">{loggedUser.userData.username}</div></span>
        <form onSubmit={this.handleSubmit}>
            <input name="title" placeholder="Title" value={title} onChange={this.handleTitle}/>
            <ReactQuill
              className="new-post"
              name="body"
              value={body}
              onChange={this.handleChange}
              placeholder="Text (optional)"
              modules={ this.modules }
            />
          { title ? <button>Post</button> : <button disabled>Post</button>}
        </form>
        </div>
      : <div className="comment-login">
          What are your thoughts? Login or Sign Up to Create Post
          <span>
            <Link to="/auth/login"><button className="button-login">LOG IN</button></Link>
            <Link to="/auth/signup"><button className="button-signup">SIGN UP</button></Link>
          </span>
          </div>
          )
  }
}
