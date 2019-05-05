import { SIGN_UP, LOGIN, RECEIVE_ERROR } from '../actions/AuthActions.js';

const AuthReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case SIGN_UP:
      return { signedUpUser: action.signedUpUser}
    case LOGIN:
      return { loggedUser: action.loggedUser}
    case RECEIVE_ERROR:
      return { error: action.error}
    default:
      return oldState
  }
}

export default AuthReducer;
