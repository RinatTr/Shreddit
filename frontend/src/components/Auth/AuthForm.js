import React, { Component } from "react";
import { Link, Route, Switch, Redirect } from "react-router-dom";
import icon from '../../icons/iconfinder_Faint_2695614.png'
import '../../css/Authform.css'

class AuthForm extends Component {
  constructor() {
    super();
    this.state = {
        username: "",
        password: "",
        email: ""
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
//ERRORS: 401 - wrong username or password. 500 - no such user (login) user already exists (signup).
  handleSubmit = (e) => {
    e.preventDefault()
    let { username, password, email } = this.state;
    let newUser = { username, password, email }
    let userLogin = { username, password }
    let isLogin = ( this.props.match.path === "/auth/login" )

    if (isLogin) {
      this.props.loginUser(userLogin)
      this.props.history.goBack();
    } else {
      this.props.signUpUser(newUser)
      this.props.loginUser(userLogin)
      this.props.history.goBack();
    }

  }
  render() {
    let { username, password, email } = this.state;
    let userState = this.props.loggedInUser;
    let isLoggedIn = userState ? userState.isLoggedIn : "";

    let isPathLogin = (this.props.match.path === "/auth/login");

    return (
      isLoggedIn
      ? <Redirect to="/all" />
      : <React.Fragment>
         <div className="auth-black">
           <div className="auth-wrapper">
             <div className="art"></div>
             <div className="auth-form-container">
               <div className="auth-close-modal">
                 <span className="auth-close">&times;</span>
               </div>
               <div className="auth-form-content">
                 <img alt="icon" src={icon} />
                 <h1>{isPathLogin ? "Sign In" : "Sign Up"}</h1>
                 <form onSubmit={this.handleSubmit}>
                   <input
                     type="username"
                     value={username}
                     name="username"
                     placeholder="username"
                     onChange={this.handleChange}
                     required
                    />
                   <input
                     type="password"
                     value={password}
                     name="password"
                     placeholder="password"
                     onChange={this.handleChange}
                     required
                    />
                  { isPathLogin ? "" : <input
                     type="email"
                     value={email}
                     name="email"
                     placeholder="email"
                     onChange={this.handleChange}
                     required
                    /> }
                   <button type="submit">{isPathLogin ? "SIGN IN" : "SIGN UP"}</button>
                 </form>
                 <hr />
                 {isPathLogin
                    ? <span>New to Shreddit? <Link to="/auth/signup">SIGN UP</Link></span>
                    : <span>Already a member? <Link to="/auth/login">LOG IN</Link></span>}
               </div>
             </div>
          </div>
         </div>
         {/*add error handler*/}
         {/*<p>{isLoggedIn ? "Logged In!" : ""}</p>*/}
       </React.Fragment>
   )
  }
}

export default AuthForm;
