import React from 'react';

const Search = ({searchInput, posts}) => {
console.log(searchInput);
return (<p>hi</p>)
}

export default Search;

// search:
// data: all titles, post id's . from redux to navbarContainer.
//
// pseudocode:
// Search component -> pass down from navbar, get all titles / id's as props.
// setState immediately updates state as typing.
// searchHelper function   - takes in userInput from state
//                         - .filter to find all posts that .includes userInput.
//                         - .map to create array with obj including post.id and sliced title + "..."
// .mapResults to populate drop down with links to posts. (including titles)
