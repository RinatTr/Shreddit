import * as Util from '../util/util.js';
export const RECEIVE_FOLLOWS = "RECEIVE_FOLLOWS";
export const ADD_FOLLOW = "ADD_FOLLOW";

export const receiveFollows = follows => {
  return {
    type: RECEIVE_FOLLOWS,
    follows
  }
}

export const fetchFollows = (userId) => dispatch => {
  return Util.getFollows(userId)
              .then(res => {
                return dispatch(receiveFollows(res.data.follows))
              }).catch(err => {
                console.log(err);
              })
}
