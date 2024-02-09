import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import AuthDisplay from "./AuthDisplay";
import '../../css/Authform.css'

function AuthService ({ match, history, signupUser, loginUser, loggedInUser, authError, authStatus }) {
  const prevPath = useRef(match.path)
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
      await loginUser(userLogin)
      setAuthAttemptCount((prev) => prev + 1);
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
    if (authStatus) {
      // console.log("in authStatus", authStatus)
      //signup auth success
      loginUser({ username, password })
      history.push('/All');
    } 

    if (authError && authAttemptCount > 0) {
      //auth failed
      setDisplayAuthError(getAuthDisplay(authError))
    }
    //due to the shallow comparison authStatus is not retriggeiring useEffect 
    //as long as the status code from each fetch returns the same.
    //hence addind a third trigger for each authAttempt.
  }, [authError, authStatus, authAttemptCount])

  //reset auth error between auth paths
  useEffect(() => {
    if (prevPath.current !== match.path) {
      setDisplayAuthError("")
    }
    prevPath.current = match.path;
  }, [match.path])

  const userState = loggedInUser;
  const isLoggedIn = userState ? userState.isLoggedIn : "";

  const getAuthDisplay = (code) => {
    switch (code) {
      case 409:
        return "*User already exists.";
      case 500:
        return "*Internal server error. Try again later."
      case 401:
        return "*Invalid credentials."
      default:
      return ""
    }   
  }
  return (
    isLoggedIn
    ? <Redirect to="/all" />
    : <AuthDisplay
        isPathLogin={isPathLogin}
        username={username}
        password={password}
        email={email}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        displayAuthError={displayAuthError}
        handleDemo={handleDemo}
        handleClose={handleClose}
      />
  )
}

export default AuthService;
