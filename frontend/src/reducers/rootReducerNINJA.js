const initState = {
  users: [],
  posts: [
    {id: '1', title: 'Squirtle Laid an Egg', body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur voluptate laborum perferendis, enim repellendus ipsam sunt autem at odit dolorum, voluptatum suscipit iste harum cum magni itaque animi laudantium fugiat'},
    {id: '2', title: 'Charmander Laid an Egg', body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur voluptate laborum perferendis, enim repellendus ipsam sunt autem at odit dolorum, voluptatum suscipit iste harum cum magni itaque animi laudantium fugiat'},
    {id: '3', title: 'a Helix Fossil was Found', body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur voluptate laborum perferendis, enim repellendus ipsam sunt autem at odit dolorum, voluptatum suscipit iste harum cum magni itaque animi laudantium fugiat'}﻿
  ]
}

//normalize state - delete a key in an object

const rootReducer = (state = initState, action) => {
  switch(action.type) {
    case 'DELETE_POST':
      let newPosts = state.posts.filter(post => post.id !== action.id)
      //return a new object which represents the new state:
      return {
        ...state, //to prevent overriding initState
        posts: newPosts
      }
      break;
  }

  return state;
}

export default rootReducer

// component state for forms.
// util - different set of api calls in different file
// reducers have the same. sessions, errors - display to user.
