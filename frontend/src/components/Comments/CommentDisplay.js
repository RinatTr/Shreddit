import React from "react";
import upvote from '../../icons/up_arrow.png'
import downvote from '../../icons/down_arrow.png'
import TimeAgo from "react-timeago";
import '../../css/Comments.css';

const Comment = ({  id,
                    commenter,
                    timestamp,
                    body,
                    handleVote
                      }) => {
    return (
      <React.Fragment>
      <div className="comment-collapsed" id={id} >
        <div className="comment-votes">
          <img alt="upvote" className="upvote" src={upvote} id={id} onClick={handleVote}/>
          <img alt="downvote" className="downvote" src={downvote} id={id} onClick={handleVote}/>
        </div>
        <div className="comment-content">
          <div className="comment-text">
            <p className="info">
              <span>
                {commenter}
              </span>
              <span>
               <TimeAgo date={timestamp}/>
              </span>
            </p>
            <p>{body}</p>
            <hr/>
          </div>
        </div>
      </div>
      </React.Fragment>
    )
  }

export default Comment;
