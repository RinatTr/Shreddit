import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";

export default class AddComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      body: ""
    }
  }

  handleChange = (e) => {
    //Quill configuration:
    this.setState({
      body: e
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    let { postId, loggedUser, postComment, fetchCommentsPerPost } = this.props;
    let { body } = this.state;
    //conditional to prevent empty "enter" submit
    if (body && loggedUser) {
      postComment({ commenter_id: loggedUser.userData.id,
                            post_id: postId,
                            votes: 0,
                            body }, postId)
                  .then(() => fetchCommentsPerPost(postId) )
      this.setState({
        body: ""
      })
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
    let { body } = this.state;
    return (
      loggedUser
      ? <div className="comment-add">
        <span>Comment as <div className="comment-username">{loggedUser.userData.username}</div></span>
        <form onSubmit={this.handleSubmit}>
          {/*<textarea name="body" placeholder="What are your thoughts?" value={this.state.body} onChange={this.handleChange}/>*/}
            <ReactQuill
            className="newNoteQuill"
            name="body"
            value={body}
            onChange={this.handleChange}
            placeholder="What are your thoughts?"
            modules={ this.modules }
          />
          {body ? <button>Comment</button> : <button disabled>Comment</button>}
        </form>
        </div>
      : <div className="comment-login">
          What are your thoughts? Login or Sign Up
          <span>
            <Link to="/auth/login"><button className="button-login">LOG IN</button></Link>
            <Link to="/auth/signup"><button className="button-signup">SIGN UP</button></Link>
          </span>
          </div>
          )
  }
}
