//plan :
// stateful component
// form: body
// redirect if not logged in, along with last route, to redirect back.
// what needs from redux ?
// 1. loggedInUser
// 2. new dispatch: create comment (new sql query too)
// 3. new api route and sql query + redux to retreive currentUser info.
//    perhaps inside the checkauthstatus ?
//    - so can have the avatar and the current logged in user ID

//pass commenter_id, post_id, body into a new POST util, create sql query:
// INSERT INTO comments VALUES (body, commenter_id, post_id)
//(does it have to show in component ? yes, more readable)

import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class AddComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      body: ""
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
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
  //post comment axios+redux takes commentObj and post_id.
  // commentObj is {commenter_id, post_id, votes, body}
  //pass post_id as props fro the modal
  // create a form
  render() {
    let { loggedUser } = this.props;
    return (<div className="comment-add">
            Comment as {loggedUser.userData.username}
            <form onSubmit={this.handleSubmit}>
              <input type="textarea" name="body" placeholder="What are your thoughts?" value={this.state.body} onChange={this.handleChange}/>
              {this.state.body ? <button>Add Comment</button> : ""}
            </form>
            </div>)
  }
}
