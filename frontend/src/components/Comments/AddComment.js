import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";

export default function AddComment (props) {
  const [body, setBody] = useState("");

  const handleChange = (e) => {
    // Quill configuration:
    setBody(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    let { postId, loggedUser, postComment, fetchCommentsPerPost } = props;
     // Conditional to prevent empty "enter" submit
    if (body && loggedUser) {
      postComment({
        commenter_id: loggedUser.userData.id,
        post_id: postId,
        votes: 0,
        body
      }, postId)
        .then(() => {
          fetchCommentsPerPost(postId);
          setBody(""); 
        });
    }
  }

  const modules = {
   toolbar: [
     [{ 'header': [1, 2, false] }],
     ['bold', 'italic','strike', 'blockquote'],
     [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
     ['link'],
     ['clean']
   ]
 }

  let { loggedUser } = props;
  return (
    loggedUser
    ? <div className="comment-add">
      <span>Comment as <div className="comment-username">{loggedUser.userData.username}</div></span>
      <form onSubmit={handleSubmit}>
        {/*<textarea name="body" placeholder="What are your thoughts?" value={body} onChange={handleChange}/>*/}
          <ReactQuill
          className="quill-new-comment"
          name="body"
          value={body}
          onChange={handleChange}
          placeholder="What are your thoughts?"
          modules={ modules }
        />
      {body !== "<p><br></p>" && body ? <button>Comment</button> : <button disabled>Comment</button>}
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
