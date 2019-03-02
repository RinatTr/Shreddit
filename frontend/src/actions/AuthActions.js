import * as Util from '../util/util.js';
import Auth from '../util/Auth'

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
//fill the loginUser
// in component, fire signup and .then() login from props when registering.
//

export const signUpUser = (user) => dispatch => {
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
            .then(() => {
              Auth.authenticateUser(user.username)
            })
            .then(() => {
              return dispatch(checkAuthenticateStatus())
            })
            .catch(err => {
              return dispatch(getError("login", err.response.status))
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
                if (res.data.username === Auth.getToken()) {
                  return dispatch(login({
                    isLoggedIn: Auth.isUserAuthenticated(),
                    username: Auth.getToken()
                  }))
                } else {
                  if (res.data.username) {
                    logoutUser();
                  } else {
                    Auth.deauthenticateUser();
                  }
                }
              })
}
