import React, { useState, useRef, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import icon from '../../icons/iconfinder_Faint_2695614.png'
import all from '../../icons/iconfinder_ic_clear_all_48px_352269.png'
import popular from '../../icons/iconfinder_ic_trending_up_48px_352184.png'
import createPost from '../../icons/create_post_32.png'
import logout from '../../icons/logout_32.png'
import profile from '../../icons/profile_32.png'
import '../../css/Navbar.css';
import Search from './Search.js'

function Navbar (props) {
  const [searchInput, setSearchInput] = useState("");
  const [defaultOpt, setDefaultOpt] = useState("");
  const [openAvatarDropdown, setOpenAvatarDropdown] = useState(false);
  const { loggedInUser, fetchFollows, fetchUserSavedPosts, fetchUserSubshreddits, location } = props;

  const prevLoggedInUser = useRef(loggedInUser);
  const prevLocation = useRef(location);
  const prevNav = useRef();

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

    const handleOutsideClick = (e) => {
      if (prevNav.current && !prevNav.current.contains(e.target)) {
        // Clicked outside the nav, so close it
        setOpenAvatarDropdown(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
    }, [])

  const handleLogout = () => {
    console.log("[AUTH:] handleLogout")
    props.logoutUser();
    props.history.push('/All')
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

  const toggleAvatarDropdown = () => {
    setOpenAvatarDropdown(!openAvatarDropdown);
};

  let { follows, posts, subshreddits } = props;
  let currentUser = loggedInUser ? loggedInUser.username : "";
  let mapSubs = subshreddits ? subshreddits.map((sub, i) => {return <option key={i+"subs"} id={"subs"+sub.subshreddit_id}>{sub.groupname}</option>}) : null;
  let mapUsers = follows ? follows.map((follow, i) => {return <option key={i+"user"} id="user">{follow.followed_user}</option>}) : null;
    return (
      <nav ref={prevNav}>
        <Link to="/popular"><img alt="icon" src={icon}/><span className="mobile-hide">shreddit</span></Link>
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
        <Link className="mobile-hide" to="/popular"><img  alt="all" src={popular}/></Link>
        <Link className="mobile-hide" to="/all"><img  alt="all" src={all}/></Link>
        {currentUser
          ? <>
              <img onClick={toggleAvatarDropdown} alt="user-avatar" className="user-avatar" src={loggedInUser.userData.avatar_url}/>
              {openAvatarDropdown 
                ?
                  <div className="nav-dropdown-container">
                    <Link to={`/user/${currentUser}`} id="username"><img alt="profile" src={profile}/>{currentUser}</Link>
                    <Link to="/submit" id="create-post"><img alt="create post" src={createPost}/>Create Post</Link>
                    <a href="/" onClick={handleLogout}><img alt="log out" src={logout}/>Log Out</a> 
                  </div>
                : null}
              
            </>
          : <>
              <Link to="/auth/login"><button className="button-login">LOG IN</button></Link>
              <Link className="mobile-hide" to="/auth/signup"><button>SIGN UP</button></Link>
            </>}
      </nav>
    )
}

export default withRouter(Navbar);
