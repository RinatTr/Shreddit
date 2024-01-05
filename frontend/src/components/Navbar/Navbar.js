import React, { useState, useRef, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import icon from '../../icons/iconfinder_Faint_2695614.png'
import all from '../../icons/iconfinder_ic_clear_all_48px_352269.png'
import popular from '../../icons/iconfinder_ic_trending_up_48px_352184.png'
import createPost from '../../icons/createPostTeal.png'
import '../../css/Navbar.css';
import Search from './Search.js'

function Navbar (props) {
  const [searchInput, setSearchInput] = useState("");
  const [defaultOpt, setDefaultOpt] = useState("");
  const { loggedInUser, fetchFollows, fetchUserSavedPosts, fetchUserSubshreddits, location } = props;

  const prevLoggedInUser = useRef(loggedInUser);
  const prevLocation = useRef(location);

  useEffect(() => {
    if (loggedInUser) {
      if (!prevLoggedInUser.current || loggedInUser.username !== prevLoggedInUser.current.username) {
        fetchFollows(loggedInUser.userData.id);
        fetchUserSavedPosts(loggedInUser.userData.id);
        fetchUserSubshreddits(loggedInUser.userData.id);
      }
    }

    // Update top menu option
    if (prevLocation.current.pathname !== location.pathname) {
      if (loggedInUser) {
        fetchUserSubshreddits(loggedInUser.userData.id);
      }
      setDefaultOpt(location.pathname);
    }

    // Update prevLoggedInUser and prevLocation after the component has rendered
    prevLoggedInUser.current = loggedInUser;
    prevLocation.current = location;
  }, [loggedInUser, location.pathname]);

  useEffect(() => {
    props.checkAuthenticateStatus();
    setDefaultOpt(location.pathname)
    }, [])
 

  const handleLogout = () => {
    console.log("[AUTH:] handleLogout")
    props.logoutUser();
    window.location.reload();
  }

  const handleChange = (e) => {
    let path = e.target.selectedOptions[0].innerText
    let optionId = e.target.selectedOptions[0].id
    switch (optionId.slice(0,4)) {
      case "user":
      props.history.push(`/user/${path}`)
      break;
      case "subs":
      props.history.push(`/subshreddit/${optionId.slice(4, optionId.length)}`)
      break;
      case "default":
      break;
      default:
      props.history.push(`/${path}`)
    }
  }

  const handleSearch = (e) => {
      setSearchInput(e.target.value)
  }

  const handleClick = () => {
    setSearchInput("")
  }

  let { follows, posts, subshreddits } = props;
  let currentUser = loggedInUser ? loggedInUser.username : "";
  let mapSubs = subshreddits ? subshreddits.map((sub, i) => {return <option key={i+"subs"} id={"subs"+sub.subshreddit_id}>{sub.groupname}</option>}) : null;
  let mapUsers = follows ? follows.map((follow, i) => {return <option key={i+"user"} id="user">{follow.followed_user}</option>}) : null;
    return (
      <nav>
        <Link to="/popular"><img alt="icon" src={icon}/>shreddit</Link>
        <select id="select" name="select" onChange={(e) => {handleChange(e)}}>
          <option id="default" disabled defaultValue={defaultOpt}>{defaultOpt}</option>
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
            onChange={handleSearch}
          />
        <Search searchInput={searchInput} posts={posts} handleClick={handleClick}/>
        </div>
        <Link to="/popular"><img alt="all" src={popular}/></Link>
        <Link to="/all"><img alt="all" src={all}/></Link>
        {currentUser
          ? <><Link to="/submit"><img alt="createPost" src={createPost}/></Link><Link to={`/user/${currentUser}`} id="username">{currentUser}</Link><button onClick={handleLogout}>LOG OUT</button></>
        : <><Link to="/auth/login"><button className="button-login">LOG IN</button></Link>
              <Link to="/auth/signup"><button>SIGN UP</button></Link>
              </>}
      </nav>
    )
}


export default withRouter(Navbar);
