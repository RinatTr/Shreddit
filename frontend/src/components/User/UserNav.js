import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

//plan :
// 1. display only for loggedUser page
// 2. fix css - if isLoggedUserPage - have a different class name with no margin.
// 3. selected span.
class UserNav extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { loggedUser, location } = this.props;
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
}
export default withRouter(UserNav);
