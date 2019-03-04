import { RECEIVE_USER_POSTS } from '../actions/UserActions';


// const normalizeData = arr => {
//   let obj = {};
//   arr.forEach(item => {
//     obj[item.id] = item;
//   });
//   return obj
// }

const UserReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_USER_POSTS:
      return {...oldState, posts: action.posts}
    default:
      return oldState
  }
}

export default UserReducer;
