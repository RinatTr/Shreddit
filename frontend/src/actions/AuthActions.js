import * as Util from '../util/util.js';
import Auth from '../util/Auth.js'

export const SIGN_UP = "SIGN_UP";
export const LOGIN = "LOGIN";
export const RECEIVE_ERROR = "RECEIVE_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";

export const signUp = (signedUpUser, statusCode) => {
  return {
    type: SIGN_UP,
    signedUpUser,
    statusCode
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

export const clearError = () => {
  return {
    type: CLEAR_ERROR
  }
}

export const signupUser = (user) => dispatch => {
// thunk is expecting a function not an action. action is sent to reducer, hence wrapped in another function.
  return Util.createUser(user)
            .then((res) => {
              return dispatch(signUp(user.username, res.status))
            })
            .then(() => {
              //clear error will only cleanup older attempt errors from store and 
              //will not interfere with potential errors in this chain 
              return dispatch(clearError())
            })
            .catch(err => {
              return dispatch(getError("signup", err.response.status))
            })
};

//TODO: modify flow for JWT
export const loginUser = (user) => dispatch => {
  return Util.login(user)
            .then((res) => {
              console.log("AUTH: login request successful:", res)
              //extract token and store it in localStorage
              Auth.authenticateUser(res.data.token)
              
              Util.getUser(res.data.username)
              .then(res => {
                console.log("4 AUTH: getUser:", res)
                return dispatch(login({
                  isLoggedIn: Auth.isUserAuthenticated(),
                  username: res.data.user.username,
                  userData: res.data.user
                }))
              })
            })
            .then(() => {
              //clear error will only cleanup older attempt errors from store and 
              //will not interfere with potential errors in this chain 
              return dispatch(clearError())
            })
            .catch(err => {
              return dispatch(getError("login", err.response.status))
            })
}

export const logoutUser = () => dispatch => {
  return Auth.deauthenticateUser();
}

