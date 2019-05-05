import { RECEIVE_FOLLOWS } from '../actions/FollowActions.js';


// const normalizeData = arr => {
//   let obj = {};
//   arr.forEach(item => {
//     obj[item.id] = item;
//   });
//   return obj
// }

const FollowsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_FOLLOWS:
      return {...oldState, follows: action.follows}
    default:
      return oldState
  }
}

export default FollowsReducer;
