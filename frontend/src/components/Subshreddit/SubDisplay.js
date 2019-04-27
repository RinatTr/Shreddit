import React from 'react';
import { Link } from 'react-router-dom';

const SubInfo = ({subname, avatar, cakeDay, handleFollow, handleUnfollow, isSubscribed, isLoggedUserPage}) => {
  return (
    <div className="sub-info-container">
      <div className="sub-blue"></div>
      <div className="sub-content">
        <div className="sub-floater">
          <div className="avatar-wrapper">
            <img alt="avatar" src={avatar} id="avatar"/>
          </div>
          <span><Link to={`/subshreddit/${subname}`}>/s/{subname}</Link></span>
          {!isLoggedUserPage ? (isSubscribed
            ? <button className="follow" onClick={handleUnfollow}>UNSUBSCRIBE</button>
            : <button className="follow" onClick={handleFollow}>SUBSCRIBE</button>) : null}
        </div>
      </div>
    </div>
  )
}

export default SubInfo;
