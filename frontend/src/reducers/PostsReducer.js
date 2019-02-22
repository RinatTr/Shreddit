import { RECEIVE_POSTS } from '../actions/PostActions';

// const normalizeData = arr => {
//   let obj = {};
//   arr.forEach(item => {
//     obj[item.id] = item;
//   });
//   return obj
// }

const PostsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_POSTS:
      return (action.posts)
    default:
      return oldState
  }
}

export default PostsReducer;
