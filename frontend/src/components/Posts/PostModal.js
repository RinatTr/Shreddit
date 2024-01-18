import React from "react";
import TimeAgo from "react-timeago";
import { Link } from 'react-router-dom';
import upvote from '../../icons/up_arrow.png'
import downvote from '../../icons/down_arrow.png'
import comment from '../../icons/comment.png'
// import hide from '../../icons/hide.png'
import save from '../../icons/save.png'
import saved from '../../icons/saved.png'
import Comment from '../Comments/CommentDisplay.js'
import AddCommentContainer from '../Comments/AddCommentContainer.js'
import ReactHtmlParser from 'react-html-parser';

const PostModal = ({  id,
                      votes,
                      timestamp,
                      header,
                      commentCount,
                      body,
                      username,
                      groupname,
                      groupImgUrl,
                      groupId,
                      handleVote,
                      handleExpand,
                      handleSave,
                      isSaved,
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
        <article>
          <section>
            <div className="close-modal">
              <div className="votes">
                <img alt="upvote" className="upvote" src={upvote} id={id} onClick={handleVote}/>
                {votes}
                <img alt="downvote" className="downvote" src={downvote} id={id} onClick={handleVote}/>
              </div>
              <span className="close" onClick={handleExpand}>&times;&nbsp;<div>CLOSE</div></span>
            </div>
          </section>
          <section>
            <div className="post-expanded">
              <div className="post-content">
                <div className="post-text">
                  <p className="info">
                    <span>
                      {groupImgUrl ? <span className="center-cropped-icon"><img alt="subshr" src={groupImgUrl} /></span> : null }
                        <strong><Link className="groupname" to={`/subshreddit/${groupId}`}>/s/{groupname}</Link></strong>
                    </span>
                    <span>
                    Posted by {username}
                    </span>
                    <span>
                    <TimeAgo date={timestamp}/>
                    </span>
                  </p>
                  <h3>{header}</h3>
                  <p>{ReactHtmlParser(body)}</p>
                </div>
                <div className="post-buttons">
                  <img alt="comment" src={comment} />
                  {commentCount} Comments
                  {isSaved ? <><span className="saved-container" id={id} onClick={handleSave}><img alt="save" src={saved} id={id} onClick={handleSave}/>Saved</span></> : <><span className="save-container" id={id} onClick={handleSave}><img alt="save" src={save} />Save</span></>}
                  {/*<img alt="hide" src={hide} />
                Hide*/}
                </div>
              </div>
              <AddCommentContainer postId={id}/>
              <div className="comments">
              <hr />
                {mapComments}
              </div>
            </div>
          </section>
        </article>
      </div>
      </React.Fragment>
    )
  }

export default PostModal;
