import React from 'react';
import { Link } from 'react-router-dom'

const Search = ({searchInput, posts, handleClick}) => {
let result = posts && searchInput ? posts.filter(post => { return post.header.toLowerCase().includes(searchInput.toLowerCase()) })
                                          .map((post) => { let obj = {  title: post.header.slice(0,20) + "...",
                                                                        id: post.id  }
                                                                        return obj }) : null ;
let mapResults = result ? result.map(post => { return <li key={post.id} onClick={handleClick}><Link to={`/post/${post.id}`}>{post.title}</Link></li>}) : null ;

return mapResults ? (<div className="search-dropdown-container">
                      <ul>
                        {mapResults}
                      </ul>
                    </div>) : null ;
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
// height of dropdown - display max top 10 results, or overflow:scroll.
// challenges - lowercase / uppercase to match search or not ?
//            - have the search output display from starting search input string
//            - closing search input - detect click outside element / after click on post.
