import { SIGN_UP, LOGIN, RECEIVE_ERROR, CLEAR_ERROR } from '../actions/AuthActions.js';

const initialState = {
  signedUpUser: null,
  statusCode: null,
  loggedUser: null,
  error: null,
}

const AuthReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case SIGN_UP:
      return { ...state, 
               signedUpUser: action.signedUpUser, 
               statusCode: action.statusCode }
    case LOGIN:
      return { ...state, 
               loggedUser: action.loggedUser}
    case RECEIVE_ERROR:
      return {  ...state, 
                error: action.errCode}
    case CLEAR_ERROR:
      return { ...state,
               error: null }
    default:
      return state
  }
}

export default AuthReducer;
