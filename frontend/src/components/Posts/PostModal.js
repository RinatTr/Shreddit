import React from "react";
import upvote from '../../icons/up_arrow.png'
import downvote from '../../icons/down_arrow.png'
import TimeAgo from "react-timeago";

const PostModal = ({  id,
                      votes,
                      timestamp,
                      header,
                      body,
                      username,
                      groupname,
                      groupImgUrl,
                      handleVote,
                      handleExpand }) => {
    return (
      <React.Fragment>
      <div className="black">
        <div className="post-expanded">
          <div className="close">
            <div className="votes">
              <img alt="upvote" className="upvote" src={upvote} id={id} onClick={handleVote}/>
                {votes}
              <img alt="downvote" className="downvote" src={downvote} id={id} onClick={handleVote}/>
            </div>
            <span className="close" onClick={handleExpand}><div>CLOSE</div>&times;</span>
          </div>
          <div className="post-content">
            <div className="post-text">
              <p className="info">
                <span>
                  <img alt={groupImgUrl} src={groupImgUrl} />
                  <strong>/r/{groupname}</strong>
                </span>
                <span>
                 Posted by {username}
                </span>
                <span>
                 <TimeAgo date={timestamp}/>
                </span>
               </p>
              <h3>{header}</h3>
              <p>{body}</p>
            </div>
            <div className="post-buttons">
              [icon] NUM Comments [icon] Save [icon] Hide
            </div>
          </div>
        </div>
      </div>
      </React.Fragment>
    )
  }

export default PostModal;
