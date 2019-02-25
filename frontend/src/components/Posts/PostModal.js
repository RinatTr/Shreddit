import React from "react";
import TimeAgo from "react-timeago";
import upvote from '../../icons/up_arrow.png'
import downvote from '../../icons/down_arrow.png'
import Comment from '../Comments/CommentDisplay'

const PostModal = ({  id,
                      votes,
                      timestamp,
                      header,
                      body,
                      username,
                      groupname,
                      groupImgUrl,
                      handleVote,
                      handleExpand,
                      comments }) => {

    let mapComments = comments.map(comment => {
      return <Comment id={comment.id}
                commenter={comment.commenter}
                timestamp={comment.created_at}
                body={comment.body}
                votes={comment.votes}
                handleVote={handleVote}
              />
          })

    return (
      <React.Fragment>
      <div className="black">
        <div className="close-modal">
          <div className="votes">
            <img alt="upvote" className="upvote" src={upvote} id={id} onClick={handleVote}/>
            {votes}
            <img alt="downvote" className="downvote" src={downvote} id={id} onClick={handleVote}/>
          </div>
          <span className="close" onClick={handleExpand}><div>CLOSE</div>&times;</span>
        </div>
        <div className="post-expanded">
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
          <div className="comments">
          <hr />
            {mapComments}
          </div>
        </div>
      </div>
      </React.Fragment>
    )
  }

export default PostModal;
