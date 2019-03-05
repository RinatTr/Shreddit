import React from "react";
import upvote from '../../icons/up_arrow.png'
import downvote from '../../icons/down_arrow.png'
import comment from '../../icons/comment.png'
import hide from '../../icons/hide.png'
import save from '../../icons/save.png'
import TimeAgo from "react-timeago";
import { Link } from 'react-router-dom';

const Post = ({ id,
                votes,
                timestamp,
                header,
                body,
                commentCount,
                username,
                groupname,
                groupImgUrl,
                handleVote,
                handleExpand }) => {
    return (
      <React.Fragment>
      <div className="post-collapsed" id={id} onClick={handleExpand}>
        <div className="votes">
          <img alt="upvote" className="upvote" src={upvote} id={id} onClick={handleVote}/>
            {votes}
          <img alt="downvote" className="downvote" src={downvote} id={id} onClick={handleVote}/>
        </div>
        <div className="post-content">
          <div className="post-text">
            <p className="info">
              <span>
                {groupImgUrl ? <img alt={groupImgUrl} src={groupImgUrl} /> : null}
                <strong>/r/{groupname}</strong>
              </span>
              <span>
               Posted by <Link className="username" to={`/user/${username}`}>/u/{username}</Link>
              </span>
              <span>
               <TimeAgo date={timestamp}/>
              </span>
             </p>
            <h3>{header}</h3>
            <p>{body ? body.slice(0,100)+"..." : null}</p>
          </div>
          <div className="post-buttons">
            <img alt="comment" src={comment} />
            {commentCount} Comments
            <img alt="save" src={save} />
            Save
            <img alt="hide" src={hide} />
            Hide
          </div>
        </div>
      </div>
      </React.Fragment>
    )
  }

export default Post;
