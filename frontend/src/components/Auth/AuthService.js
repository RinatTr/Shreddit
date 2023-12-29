import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import icon from '../../icons/iconfinder_Faint_2695614.png'
import '../../css/Authform.css'

function AuthService ({ match, history, signupUser, loginUser, loggedInUser }) {
 
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const isPathLogin = (match.path === "/auth/login");
  const { username, password, email } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

//ERRORS: 401 - wrong username or password. 500 - no such user (login) user already exists (signup).
  const handleSubmit = (e) => {
    e.preventDefault()
    const newUser = { username, password, email };
    const userLogin = { username, password }

    if (isPathLogin) {
      loginUser(userLogin)
      history.push('/All');
    } else {
      signupUser(newUser)
      loginUser(userLogin)
      history.push('/All');
    }
  }

  const handleDemo = () => {
    loginUser({ username: "Lauren28", password: "12345"})
    history.push('/All');
  }

  const userState = loggedInUser;
  const isLoggedIn = userState ? userState.isLoggedIn : "";

  return (
    isLoggedIn
    ? <Redirect to="/all" />
    : <React.Fragment>
        <div className="auth-black">
          <div className="auth-wrapper">
            <div className="art"></div>
            <div className="auth-form-container">
              <div className="auth-close-modal">
                <span className="auth-close" onClick={()=>{history.push('/All')}}>&times;</span>
              </div>
              <div className="auth-form-content">
                {isPathLogin && <img alt="icon" src={icon} /> }
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

export default AuthService;
