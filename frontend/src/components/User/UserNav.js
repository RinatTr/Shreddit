import React from 'react';
import { Link } from 'react-router-dom';
const UserNav = ({loggedUser}) => {
  return(
    <>
      <div className="user-nav">
        <Link to={`/user/${loggedUser.username}/saved`}>saved</Link>
        <Link to={`/user/${loggedUser.username}`}>all</Link>
      </div>
    </>
  )
}
export default UserNav;
