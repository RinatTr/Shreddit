import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import icon from '../../icons/iconfinder_Faint_2695614.png'
import all from '../../icons/iconfinder_ic_clear_all_48px_352269.png'
import popular from '../../icons/iconfinder_ic_trending_up_48px_352184.png'
import '../../css/Navbar.css';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: "",
      select: ""
    }
  }
  /* code spotlight moment... */
  componentDidUpdate(prevProps) {
    let { loggedInUser, fetchFollows } = this.props;
    if (loggedInUser) {
      if (!prevProps.loggedInUser || loggedInUser.username !== prevProps.loggedInUser.username) {
        fetchFollows(loggedInUser.userData.id)
      }
    }
  }

  componentDidMount() {
    this.props.checkAuthenticateStatus();
  }

  handleLogout = () => {
    this.props.logoutUser();
    window.location.reload();
  }

  handleChange = (e) => {
    let username = e.target.selectedOptions[0].innerText
    this.props.history.push(`/user/${username}`)
  }

  render() {
    let { searchInput, select } = this.state;
    let { loggedInUser, follows } = this.props;
    let currentUser = loggedInUser ? loggedInUser.username : ""

    let mapMenu = follows ? follows.map((follow, i) => {return <option key={i}>{follow.followed_user}</option>}) : null;
      console.log(mapMenu);
    return (
      <nav>
        <Link to="/popular"><img alt="icon" src={icon}/>shreddit</Link>
        <select name="select" onChange={(e) => {this.handleChange(e)}}>
          <option>[ICON] POPULAR</option>
          <option>[ICON] ALL</option>
          {mapMenu}
        </select>
        <input
          type="text"
          name="searchInput"
          placeholder="[ICON] SEARCH"
          value={searchInput}
          onChange={this.handleChange}
        />
        <Link to="/popular"><img alt="all" src={popular}/></Link>
        <Link to="/all"><img alt="all" src={all}/></Link>
        {currentUser
          ? <><Link to={`/user/${currentUser}`}>{currentUser}</Link><button onClick={this.handleLogout}>LOG OUT</button></>
          : <><Link to="/auth/login"><button>LOG IN</button></Link>
              <Link to="/auth/signup"><button>SIGN UP</button></Link>
              </>}
      </nav>
    )
  }
}


export default withRouter(Navbar);
