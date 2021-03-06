import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import icon from '../../icons/iconfinder_Faint_2695614.png'
import all from '../../icons/iconfinder_ic_clear_all_48px_352269.png'
import popular from '../../icons/iconfinder_ic_trending_up_48px_352184.png'
import createPost from '../../icons/createPostTeal.png'
import '../../css/Navbar.css';
import Search from './Search.js'

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: "",
      select: "",
      defaultOpt: ""
    }
  }
  /* code spotlight moment... */
  componentDidUpdate(prevProps) {
    let { loggedInUser, fetchFollows, fetchUserSavedPosts, fetchUserSubshreddits } = this.props;
    if (loggedInUser) {
      if (!prevProps.loggedInUser || loggedInUser.username !== prevProps.loggedInUser.username) {
        fetchFollows(loggedInUser.userData.id)
        fetchUserSavedPosts(loggedInUser.userData.id)
        fetchUserSubshreddits(loggedInUser.userData.id)
      }
    }
    //update top menu option
    if (prevProps.location.pathname !== this.props.location.pathname) {
      if (loggedInUser) {
        fetchUserSubshreddits(loggedInUser.userData.id)
      }
      this.setState({
        defaultOpt: this.props.location.pathname
      })
    }
  }

  componentDidMount() {
    this.props.checkAuthenticateStatus();
    this.setState({
      defaultOpt: this.props.location.pathname
    })
  }

  handleLogout = () => {
    this.props.logoutUser();
    window.location.reload();
  }

  handleChange = (e) => {
    let path = e.target.selectedOptions[0].innerText
    let optionId = e.target.selectedOptions[0].id
    switch (optionId.slice(0,4)) {
      case "user":
      this.props.history.push(`/user/${path}`)
      break;
      case "subs":
      this.props.history.push(`/subshreddit/${optionId.slice(4, optionId.length)}`)
      break;
      case "default":
      break;
      default:
      this.props.history.push(`/${path}`)
    }
  }

  handleSearch = (e) => {
    this.setState({
      searchInput: e.target.value
    })
  }

  handleClick = () => {
    this.setState({
      searchInput: ""
    })
  }

  render() {
    let { searchInput, select, defaultOpt } = this.state;
    let { loggedInUser, follows, posts, subshreddits } = this.props;
    let currentUser = loggedInUser ? loggedInUser.username : "";
    let mapSubs = subshreddits ? subshreddits.map((sub, i) => {return <option key={i+"subs"} id={"subs"+sub.subshreddit_id}>{sub.groupname}</option>}) : null;
    let mapUsers = follows ? follows.map((follow, i) => {return <option key={i+"user"} id="user">{follow.followed_user}</option>}) : null;
    return (
      <nav>
        <Link to="/popular"><img alt="icon" src={icon}/>shreddit</Link>
        <select id="select" name="select" onChange={(e) => {this.handleChange(e)}}>
          <option id="default" defaultValue={defaultOpt}>{defaultOpt}</option>
          <option id="popular">Popular</option>
          <option id="all">All</option>
          <option disabled>Users</option>
          {mapUsers}
          <option disabled>Subshreddits</option>
          {mapSubs}
        </select>
        <div className="search-bar">
          <input
            type="text"
            id="search"
            name="searchInput"
            placeholder="SEARCH TITLE"
            value={searchInput}
            onChange={this.handleSearch}
          />
        <Search searchInput={searchInput} posts={posts} handleClick={this.handleClick}/>
        </div>
        <Link to="/popular"><img alt="all" src={popular}/></Link>
        <Link to="/all"><img alt="all" src={all}/></Link>
        {currentUser
          ? <><Link to="/submit"><img alt="createPost" src={createPost}/></Link><Link to={`/user/${currentUser}`} id="username">{currentUser}</Link><button onClick={this.handleLogout}>LOG OUT</button></>
        : <><Link to="/auth/login"><button className="button-login">LOG IN</button></Link>
              <Link to="/auth/signup"><button>SIGN UP</button></Link>
              </>}
      </nav>
    )
  }
}


export default withRouter(Navbar);
