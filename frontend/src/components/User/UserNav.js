import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

//plan :
// 1. display only for loggedUser page
// 2. fix css - if isLoggedUserPage - have a different class name with no margin.
class UserNav extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { loggedUser } = this.props;
    return(
      <>
      <div className="user-nav">
        <span><Link to={`/user/${loggedUser.username}`}>ALL</Link></span>
        <span><Link to={`/user/${loggedUser.username}/saved`}>SAVED</Link></span>
      </div>
      </>
  )
  }
}
export default withRouter(UserNav);
