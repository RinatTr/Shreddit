import React from "react";
import upvote from '../../icons/up_arrow.png'
import downvote from '../../icons/down_arrow.png'
import comment from '../../icons/comment.png'
// import hide from '../../icons/hide.png'
import save from '../../icons/save.png'
import saved from '../../icons/saved.png'
import TimeAgo from "react-timeago";
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

const Post = ({ id,
                votes,
                timestamp,
                header,
                body,
                commentCount,
                isSaved,
                username,
                groupname,
                groupImgUrl,
                handleVote,
                handleExpand,
                handleSave }) => {
    return (
      <React.Fragment>
      <div className="post-collapsed" id={id} onClick={handleExpand}>
        <div className="votes">
          <img alt="upvote" className="upvote" src={upvote} id={id} onClick={handleVote}/>
            {votes}
          <img alt="downvote" className="downvote" src={downvote} id={id} onClick={handleVote}/>
        </div>
        <div className={body ? "post-content" : "post-content-user"}>
            <p className="info">
              <span>
                {groupImgUrl ? <span className="center-cropped-icon"><img alt="subshr" src={groupImgUrl} /></span> : null }
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
            {body ? <span>{ReactHtmlParser(body.slice(0,100)+"...")}</span> : null}
            <div className="post-buttons">
              <img alt="comment" src={comment} />
              {commentCount} Comments
              {isSaved ? <><span className="saved-container" id={id} onClick={handleSave}><img alt="save" src={saved} id={id} onClick={handleSave}/>Saved</span></> : <><span className="save-container" id={id} onClick={handleSave}><img alt="save" src={save} />Save</span></>}
              {/*<img alt="hide" src={hide} />
            Hide*/}
            </div>
        </div>
      </div>
      </React.Fragment>
    )
  }

export default Post;
