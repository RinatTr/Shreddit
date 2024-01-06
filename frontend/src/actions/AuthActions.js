import * as Util from '../util/util.js';
import Auth from '../util/Auth.js'

export const SIGN_UP = "SIGN_UP";
export const LOGIN = "LOGIN";
export const RECEIVE_ERROR = "RECEIVE_ERROR";

export const signUp = signedUpUser => {
  return {
    type: SIGN_UP,
    signedUpUser
  }
}

export const login = loggedUser => {
  return {
    type: LOGIN,
    loggedUser
  }
}

export const getError = (key, errCode) => {
  return {
    type: RECEIVE_ERROR,
    key,
    errCode
  }
}

export const signupUser = (user) => dispatch => {
// thunk is expecting a function not an action. action is sent to reducer, hence wrapped in another function.
  return Util.createUser(user)
            .then(() => {
              return dispatch(signUp(user.username))
            })
            .catch(err => {
              return dispatch(getError("signup", err.response.status))
            })
};

export const loginUser = (user) => dispatch => {
  return Util.login(user)
            .then((res) => {
              console.log("AUTH: login request res:", res)
              Auth.authenticateUser(user.username)
            })
            .then(() => {
              return dispatch(checkAuthenticateStatus())
            })
            .catch(err => {
              console.log(err)
              return dispatch(getError("login", err))
            })
}

export const logoutUser = () => dispatch => {
  return Util.logout()
            .then(() => {
              Auth.deauthenticateUser();
            })
            .then(() => {
              checkAuthenticateStatus()
            })
            .catch(err => {
              return dispatch(getError(err))
            })
}

export const checkAuthenticateStatus = () => dispatch => {
  return Util.isLoggedIn()
              .then(res => {
                console.log("2 AUTH: in checkAuth, isLoggedIn -  token:", Auth.getToken(), res)
                if (res.data.username === Auth.getToken()) {
                  console.log("3 AUTH: username matches token:", res, Auth.getToken())
                  Util.getUser(res.data.username)
                      .then(user => {
                        console.log("4 AUTH: getUser:", user)
                        return dispatch(login({
                          isLoggedIn: Auth.isUserAuthenticated(),
                          username: Auth.getToken(),
                          userData: user.data.user
                        }))
                      })
                } else {
                  console.log("3 AUTH: username:", res.data.username, "doesnt match token:", Auth.getToken())
                  if (res.data.username) {
                    logoutUser();
                  } else {
                    Auth.deauthenticateUser();
                  }
                }
              })
              .catch(err => {
                return dispatch(getError(err))
              })
}
