import React from "react";
import upvote from '../../icons/up_arrow.png'
import downvote from '../../icons/down_arrow.png'
import TimeAgo from "react-timeago";

const Post = ({ id,
                votes,
                timestamp,
                header,
                body,
                username,
                groupname,
                handleVote }) => {
    return (
      <div className="post-collapsed">
        <div className="votes">
          <img alt="upvote" src={upvote} id={id} onClick={handleVote}/>
            {votes}
          <img alt="downvote" src={downvote} id={id} onClick={handleVote}/>
        </div>
        <div className="post-content">
          <div className="post-text">
            <p><strong>/r/{groupname}</strong> Posted by {username} <TimeAgo date={timestamp}/></p>
            <h3>{header}</h3>
            <p>{body.slice(0,100)}...</p>
          </div>
          <div className="post-buttons">
            [icon] NUM Comments [icon] Save [icon] Hide
          </div>
        </div>
      </div>
    )
  }

export default Post;
