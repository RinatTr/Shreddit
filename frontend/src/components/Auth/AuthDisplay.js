import React from "react";
import { Link } from "react-router-dom";
import icon from '../../icons/iconfinder_Faint_2695614.png'

const AuthDisplay = ({
  isPathLogin,
  username,
  password,
  email,
  handleChange,
  handleSubmit,
  displayAuthError,
  handleDemo,
  handleClose,
}) => {
  return (
    <React.Fragment>
      <div className="auth-black">
        <div className="auth-wrapper">
          <div className="art mobile-hide"></div>
          <div className="auth-form-container">
            <div className="auth-close-modal">
              <span className="auth-close" onClick={handleClose}>
                &times;
              </span>
            </div>
            <div className="auth-form-content">
              {isPathLogin && <img alt="icon" src={icon} />}
              {isPathLogin ? (
                <h1>Sign In</h1>
              ) : (
                <>
                  <h3>Join the worldwide conversation. Create a Shreddit account today.</h3>
                </>
              )}
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
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
                {!isPathLogin && (
                  <input
                    type="email"
                    value={email}
                    name="email"
                    placeholder="email"
                    onChange={handleChange}
                    required
                  />
                )}
                <div className="error-container">
                  <div className="error-text">{displayAuthError}</div>
                </div>
                <div className="auth-buttons">
                  <button type="submit">{isPathLogin ? "SIGN IN" : "SIGN UP"}</button>
                  <button onClick={handleDemo} id="demo-login">
                    DEMO LOGIN
                  </button>
                </div>
              </form>
              <hr />
              {isPathLogin ? (
                <span>New to Shreddit? <Link to="/auth/signup">SIGN UP</Link></span>
              ) : (
                <span>Already a member? <Link to="/auth/login">LOG IN</Link></span>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AuthDisplay;