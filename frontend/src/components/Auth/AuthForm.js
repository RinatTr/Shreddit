import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

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

  handleSubmit = (e) => {
    e.preventDefault()
    let { username, password, email } = this.state;
    //if path is login, then fire LOGIN action creator

    //if path is sign up, then fire sign up action creator
    let newUser = { username, password, email }
    this.props.signUpUser(newUser)

  }
  render() {
    let { username, password, email } = this.state
    let isLogin = (this.props.match.path === "/auth/login")

    return (
      <React.Fragment>
       {/*}<form onSubmit={path === "/auth/login" ? loginUser : registerUser}>*/}
       <h1>REMOVE THIS AFTER ADDING MARGIN</h1>
       <h1>{isLogin ? "Login" : "Sign Up"}</h1>
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
         { isLogin ? "" : <input
           type="email"
           value={email}
           name="email"
           placeholder="email"
           onChange={this.handleChange}
           required
          /> }

         <button type="submit">Submit</button>
       </form>
       {/*<p>{isLoggedIn ? "Logged In!" : ""}</p>*/}
     </React.Fragment>
   )
  }
}

export default AuthForm;
