import { RECEIVE_FOLLOWS } from '../actions/FollowActions.js';

const initialState = {
  follows: [],
};

const FollowsReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_FOLLOWS:
      return { ...state, follows: action.follows };
    default:
      return state;
  }
};

export default FollowsReducer;
