import { SIGN_UP, LOGIN, RECEIVE_ERROR } from '../actions/AuthActions.js';

const AuthReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case SIGN_UP:
      return { signedUpUser: action.signedUpUser, 
               statusCode: action.statusCode }
    case LOGIN:
      return { loggedUser: action.loggedUser}
    case RECEIVE_ERROR:
      return { error: action.errCode}
    default:
      return oldState
  }
}

export default AuthReducer;
