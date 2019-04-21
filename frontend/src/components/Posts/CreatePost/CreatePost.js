import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import { createPost, getAllSubshredditsPerUser } from '../../../util/util.js';

export default class CreatePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      body: "",
      title: "",
      communityId: "",
      subshreddits: []
    }
  }

  componentDidMount() {
    let { loggedUser, match } = this.props;
    if ( loggedUser ) {
      this.refreshSubshreddits(loggedUser.userData.id)
    }
  }

  componentDidUpdate(prevProps) {
    let { loggedUser, match } = this.props;
    if ( loggedUser !== prevProps.loggedUser || match.path !== prevProps.match.path ) {
      this.refreshSubshreddits(loggedUser.userData.id)
    }
  }

  refreshSubshreddits = (userId) => {
    getAllSubshredditsPerUser(userId)
        .then((res) => {
          this.setState({
            subshreddits: res.data.subshreddits
          })
        })
  }
  //needs : GET communities loggedUser is subscribed to, POST a post.
  // loggedUser - need container.
  handleSelect = (e) => {
    this.setState({
      communityId: e.target.value
    })
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
                  .then(() => {
                    this.props.history.push(`/user/${loggedUser.userData.username}`)
                  })
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
    let { body, title, communityId, subshreddits } = this.state;
    let mapGroups = subshreddits
      ? subshreddits.map((el,i) => <option key={i} value={el.subshreddit_id}>{el.groupname}</option>)
      : null
    return (
      loggedUser
      ? <div className="post-add-container">
          <div className="post-add-header">
              <h3>Create a Post</h3>
          </div>
          <div className="post-community">
            <select name="communityId" defaultValue="1" onChange={this.handleSelect}>
              <option disabled value="1">select subshreddit</option>
              {mapGroups}
            </select>
          </div>
          <div className="post-add">
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
        </div>
      : <div className="post-login">
          What are your thoughts? Login or Sign Up to Create Post
          <span>
            <Link to="/auth/login"><button className="button-login">LOG IN</button></Link>
            <Link to="/auth/signup"><button className="button-signup">SIGN UP</button></Link>
          </span>
          </div>
          )
  }
}
