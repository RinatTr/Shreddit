import React from "react";
import TimeAgo from "react-timeago";
import upvote from '../../icons/up_arrow.png'
import downvote from '../../icons/down_arrow.png'
import comment from '../../icons/comment.png'
import hide from '../../icons/hide.png'
import save from '../../icons/save.png'
import Comment from '../Comments/CommentDisplay'
import AddCommentContainer from '../Comments/AddCommentContainer'

const PostModal = ({  id,
                      votes,
                      timestamp,
                      header,
                      commentCount,
                      body,
                      username,
                      groupname,
                      groupImgUrl,
                      handleVote,
                      handleExpand,
                      comments }) => {

    let mapComments = comments.map(comment => {
      return <Comment
                key={comment.id}
                commentId={comment.id}
                postId={id}
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
          <span className="close" onClick={handleExpand}>&times;&nbsp;<div>CLOSE</div></span>
        </div>
        <div className="post-expanded">
          <div className="post-content">
            <div className="post-text">
              <p className="info">
                <span>
                  {groupImgUrl ? <div className="center-cropped-icon"><img alt="subshr" src={groupImgUrl} /></div> : null }
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
              <img alt="comment" src={comment} />
              {commentCount} Comments
              <img alt="save" src={save} />
              Save
              <img alt="hide" src={hide} />
              Hide
            </div>
          </div>
          <AddCommentContainer postId={id}/>
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
