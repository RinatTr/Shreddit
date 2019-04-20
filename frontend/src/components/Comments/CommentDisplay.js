import React from "react";
import { Link } from 'react-router-dom';
import upvote from '../../icons/up_arrow.png'
import downvote from '../../icons/down_arrow.png'
import TimeAgo from "react-timeago";
import ReactHtmlParser from 'react-html-parser';

import '../../css/Comments.css';

const Comment = ({  commentId,
                    postId,
                    commenter,
                    timestamp,
                    body,
                    votes,
                    handleVote
                      }) => {
    return (
      <React.Fragment>
      <div className="comment-collapsed" id={commentId} >
        <div className="comment-votes" id={postId}>
          <img alt="upvote" className="upvote" src={upvote} id={commentId} name="vote-comment" onClick={handleVote}/>
          <img alt="downvote" className="downvote" src={downvote} id={commentId} name="vote-comment" onClick={handleVote}/>
        </div>
        <div className="comment-content">
          <div className="comment-text">
            <p className="info">
              <span className="commenter-username">
                <Link className="commenter-username" to={`/user/${commenter}`}>{commenter}</Link>
              </span>
              <span className="comment-points">
                {votes} Points ·
              </span>
              <span className="comment-timeago">
               <TimeAgo date={timestamp}/>
              </span>
            </p>
            <p>{ReactHtmlParser(body)}</p>
            <hr/>
          </div>
        </div>
      </div>
      </React.Fragment>
    )
  }

export default Comment;
