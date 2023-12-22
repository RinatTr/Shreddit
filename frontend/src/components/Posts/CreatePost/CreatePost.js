import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import { createPost, getAllSubshredditsPerUser } from '../../../util/util.js';

export default function CreatePost (props) {
  let { loggedUser, match } = props;

  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [communityId, setCommunityId] = useState("");
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
    setCommunityId(e.target.value)
  }

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleChange = (e) => {
    //Special Quill configuration:
      setBody(e)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    //conditional to prevent empty "enter" submit
    if (body && title && loggedUser && communityId) {
      createPost({ poster_id: loggedUser.userData.id,
                              subshreddit_id: communityId,
                              votes: 0,
                              header: title,
                              body})
                  .then(() => {
                    props.history.push(`/user/${loggedUser.userData.username}`)
                  })
                  .catch((err) => console.log(err))
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
          <select name="communityId" defaultValue="1" onChange={handleSelect}>
            <option disabled value="1">select subshreddit</option>
            {mapGroups}
          </select>
        </div>
        <div className="post-add">
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" value={title} onChange={handleTitle}/>
          <ReactQuill
            className="new-post"
            name="body"
            value={body}
            onChange={handleChange}
            placeholder="Text (optional)"
            modules={ modules }
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
