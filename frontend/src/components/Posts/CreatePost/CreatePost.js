import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Quill from "../../../util/Quill.js";
import { createPost, getAllSubshredditsPerUser } from '../../../util/util.js';

export default function CreatePost (props) {
  let { loggedUser, match } = props;

  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [subshreddit_id, setsubshreddit_id] = useState("");
  const [subshreddits, setSubshreddits] = useState([]);

  const prevLoggedUser = useRef(loggedUser);
  const prevMatch = useRef(match)

  useEffect(() => {  
    if (loggedUser) {
      refreshSubshreddits(loggedUser.userData.id)
    }
  }, [])

  useEffect(() => {  
    if ( loggedUser !== prevLoggedUser || match.path !== prevMatch.path ) {
      refreshSubshreddits(loggedUser.userData.id)
    }
  }, [loggedUser, match.path] )

  const refreshSubshreddits = (userId) => {
    getAllSubshredditsPerUser(userId)
      .then((res) => {
        const subshredditsData = res.data.subshreddits || [];
        setSubshreddits(subshredditsData);
      })
      .catch((err) => console.log(err));
  };
  //needs : GET communities loggedUser is subscribed to, POST a post.
  // loggedUser - need container.
  const handleSelect = (e) => {
    setsubshreddit_id(e.target.value)
  }

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleChange = (e) => {
    //Special Quill configuration:
      setBody(e)
  }
   //to prevent empty "enter" submit
  const isFormValid = () => body && title && loggedUser && subshreddit_id

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isFormValid()) {
      createPost({ poster_id: loggedUser.userData.id,
                              subshreddit_id,
                              votes: 0,
                              header: title,
                              body})
                  .then(() => {
                    props.history.push(`/user/${loggedUser.userData.username}`)
                  })
                  .catch((err) => console.log(err))
    }
  }

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
          <select name="subshreddit_id" defaultValue="1" onChange={handleSelect}>
            <option disabled value="1">select subshreddit</option>
            {mapGroups}
          </select>
        </div>
        <div className="post-add">
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" value={title} onChange={handleTitle}/>
          <Quill
            className="new-post"
            body={body}
            handleChange={handleChange}
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
