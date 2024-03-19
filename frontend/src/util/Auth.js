const Auth = {
  authenticateUser: token => {
    console.log("0 AUTH: setting Token")
    localStorage.setItem("token", token);
    console.log("0 AUTH: Token set:", Auth.getToken())
  },
  isUserAuthenticated: () => {
    return localStorage.getItem("token") !== null;
  },
  deauthenticateUser: () => {
    console.log("4 AUTH: deauth for:", Auth.getToken())
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
