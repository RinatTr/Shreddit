import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import icon from '../../icons/iconfinder_Faint_2695614.png'
import '../../css/Authform.css'

function AuthService ({ match, history, signupUser, loginUser, loggedInUser, authError, authStatus }) {
 
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [displayAuthError, setDisplayAuthError] = useState("");
  const [authAttemptCount, setAuthAttemptCount] = useState(0);

  const isPathLogin = (match.path === "/auth/login");
  const { username, password, email } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setDisplayAuthError("")
  };

//ERRORS: 401 - wrong username or password. 500 - no such user (login) user already exists (signup).
  const handleSubmit = async (e) => {
    e.preventDefault()
    const newUser = { username, password, email };
    const userLogin = { username, password }

    if (isPathLogin) {
      loginUser(userLogin)
      setDisplayAuthError("")
      history.push('/All');
    } else { 
      await signupUser(newUser)
      setAuthAttemptCount((prev) => prev + 1);
    }
  }

  const handleDemo = () => {
    loginUser({ username: "missyE", password: "asdf"})
    history.push('/All');
  }

  const handleClose = () => {
    setDisplayAuthError("")
    history.push('/All')
  }

  useEffect(() => {
    if (authError && authAttemptCount > 0) {
      //auth failed
      setDisplayAuthError(getAuthDisplay(authError))
    }

    if (authStatus) {
      //auth success
      loginUser({ username, password })
      history.push('/All');
    }
    //due to the shallow comparison authStatus is not retriggeiring useEffect 
    //as long as the status code from each fetch returns the same.
    //hence addind a third trigger for each authAttempt.
  }, [authError, authStatus, authAttemptCount])

  const userState = loggedInUser;
  const isLoggedIn = userState ? userState.isLoggedIn : "";

  const getAuthDisplay = (code) => {
    switch (code) {
      case 409:
        return "*User already exists.";
      case 500:
        return "*Internal server error. Try again later."
      default:
        return "*Signup failed. Try again later."
    }   
  }
  return (
    isLoggedIn
    ? <Redirect to="/all" />
    : <React.Fragment>
        <div className="auth-black">
          <div className="auth-wrapper">
            <div className="art"></div>
            <div className="auth-form-container">
              <div className="auth-close-modal">
                <span className="auth-close" onClick={handleClose}>&times;</span>
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
                  <div className="error-container">
                    <div className="error-text">{displayAuthError}</div>
                  </div>
                  <div className="auth-buttons">
                    <button type="submit">{isPathLogin ? "SIGN IN" : "SIGN UP"}</button>
                    <button onClick={handleDemo} id="demo-login">DEMO LOGIN</button>
                  </div>
                </form>
                <hr />
                {isPathLogin
                  ? <span>New to Shreddit? <Link to="/auth/signup">SIGN UP</Link></span>
                  : <span>Already a member? <Link to="/auth/login">LOG IN</Link></span>}
              </div>
            </div>
        </div>
        </div>
      </React.Fragment>
  )
}

export default AuthService;
