import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function UserNav (props) {
    let { loggedUser, location } = props;
    let isSavedPath = location.pathname.slice(-5) === "saved"
    return(
      <>
      <div className="user-nav">
        <span className={!isSavedPath ? "selected" : null}><Link to={`/user/${loggedUser.username}`}>POSTED</Link></span>
        <span className={isSavedPath ? "selected" : null}><Link to={`/user/${loggedUser.username}/saved`}>SAVED</Link></span>
      </div>
      </>
  )
}
export default withRouter(UserNav);
