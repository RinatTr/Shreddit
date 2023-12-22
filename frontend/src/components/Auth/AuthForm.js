import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import icon from '../../icons/iconfinder_Faint_2695614.png'
import '../../css/Authform.css'

function AuthForm (props) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
//ERRORS: 401 - wrong username or password. 500 - no such user (login) user already exists (signup).
  const handleSubmit = (e) => {
    e.preventDefault()
    let { username, password, email } = formData;
    let newUser = { username, password, email };
    let userLogin = { username, password }
    let isLogin = ( props.match.path === "/auth/login" )

    if (isLogin) {
      props.loginUser(userLogin)
      props.history.goBack();
    } else {
      props.signUpUser(newUser)
      props.loginUser(userLogin)
      props.history.goBack();
    }
  }

  const handleDemo = () => {
    props.loginUser({ username: "Lauren28", password: "12345"})
    props.history.goBack();
  }
  let { username, password, email } = formData;
  let userState = props.loggedInUser;
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
                <span className="auth-close" onClick={()=>{props.history.goBack()}}>&times;</span>
              </div>
              <div className="auth-form-content">
                {isPathLogin ? <img alt="icon" src={icon} /> : null }
                {isPathLogin ?<h1>Sign In</h1> : <><h3>Join the worldwide conversation. Create a Shreddit account today.</h3></>}
                <form onSubmit={handleSubmit}>
                  <input
                    type="username"
                    value={username}
                    name="username"
                    placeholder="username"
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="password"
                    value={password}
                    name="password"
                    placeholder="password"
                    onChange={handleChange}
                    required
                  />
                { isPathLogin ? "" : <input
                    type="email"
                    value={email}
                    name="email"
                    placeholder="email"
                    onChange={handleChange}
                    required
                  /> }
                  <button type="submit">{isPathLogin ? "SIGN IN" : "SIGN UP"}</button>
                </form>
                <button onClick={handleDemo} id="demo-login">DEMO LOGIN</button>
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

export default AuthForm;
