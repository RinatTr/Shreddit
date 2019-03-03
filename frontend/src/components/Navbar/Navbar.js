import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

  componentDidMount() {
    this.props.checkAuthenticateStatus();
    //add loading logged user redux function 
  }

  handleLogout = () => {
    this.props.logoutUser();
    window.location.reload();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    let { searchInput, select } = this.state;
    let currentUser = this.props.loggedInUser ? this.props.loggedInUser.username : ""

    return (
      <nav>
        <Link to="/"><img alt="icon" src={icon}/>shreddit</Link>
        <select name="select" onChange={this.handleChange}>
          <option>[ICON] POPULAR</option>
          <option>[ICON] ALL</option>
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
          ? <>{currentUser}<button onClick={this.handleLogout}>LOG OUT</button></>
          : <><Link to="/auth/login"><button>LOG IN</button></Link>
              <Link to="/auth/signup"><button>SIGN UP</button></Link>
              </>}
      </nav>
    )
  }
}


export default Navbar;
