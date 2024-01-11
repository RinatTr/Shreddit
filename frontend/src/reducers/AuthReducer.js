import { SIGN_UP, LOGIN, RECEIVE_ERROR, CLEAR_ERROR } from '../actions/AuthActions.js';

const AuthReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case SIGN_UP:
      return { ...oldState, 
               signedUpUser: action.signedUpUser, 
               statusCode: action.statusCode }
    case LOGIN:
      return { ...oldState, 
               loggedUser: action.loggedUser}
    case RECEIVE_ERROR:
      return {  ...oldState, 
                error: action.errCode}
    case CLEAR_ERROR:
      return { ...oldState,
               error: null }
    default:
      return oldState
  }
}

export default AuthReducer;
