import { SIGN_UP, LOGIN, RECEIVE_ERROR } from '../actions/AuthActions';

const AuthReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case SIGN_UP:
      return { signedUpUser: action.signedUpUser}
    case LOGIN:
      return { loggedUser: action.loggedUser}
    default:
      return oldState
  }
}

export default AuthReducer;
