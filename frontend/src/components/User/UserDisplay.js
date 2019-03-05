import React from 'react';
import { Link } from 'react-router-dom';

const UserInfo = ({username, avatar}) => {
  return (
    <div className="user-info-container">
      <div className="user-blue"></div>
      <div className="user-content">
        <div className="user-floater">
          <div className="avatar-wrapper">
            <img alt="avatar" src={avatar} id="avatar"/>
          </div>
          <span><Link to={`/user/${username}`}>/u/{username}</Link></span>
        </div>
      </div>
    </div>
  )
}

export default UserInfo;
