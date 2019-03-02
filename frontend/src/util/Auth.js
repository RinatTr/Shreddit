const Auth = {
  authenticateUser: token => {
    localStorage.setItem("token", token);
  },
  isUserAuthenticated: () => {
    return localStorage.getItem("token") !== null;
  },
  deauthenticateUser: () => {
    localStorage.removeItem("token");
  },
  getToken: () => {
    return localStorage.getItem("token");
  }
};

export default Auth;

//login function should take in a user name and password
// make an axios request to handle a backend login route
//  if successful - store in localstorage
// if not - not store.

//req.user - created when succesfully logged in by passport
