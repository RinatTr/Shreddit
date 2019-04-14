**02 14 19**

1. Implement redux with net ninja.
  - add map dispatch to props ✅
  Notes:
  learned how to change state on front end. Only works due to routing, once we refresh, all del posts come back.
  need to learn how to adapt to API requests.
  (send delete request, get new posts etc.)
  it is ok to change on FE as long as we make a delete request actually delete it from the BE,
  and then an APIreq fired in component did mount, which loads all posts at the main route.

**02 15 19**

2. Seed database and insert initial, minimal amount of data. ✅
3. Create backend for Users ✅
  - npm init
  - npm i express pg-promise body-parser --save
4. Implement user authentication in backend.✅


**02 19 19**
1. implement auth in FE - INCOMPLETE. decided to leave for later after advising with Xavier,  and have "dummy login" for now.
2. user's protected features/routes should be:
  - Showing Subscriptions
  - Showing Saved Posts

**02 20 19**

1. Create Subshreddits, Posts basic BE ✅
2. insert values posts and subshreddits. ✅
3. create GET all routes. ✅
4. plan how to GET all on FE (redux, API util etc, componentDidMount) ✅


### Issues ###
- Seed all fake posts at once gives them the same exact timestamp. Will need to seed a few new posts later to test correctly "sort by most recent posts" feature, or use time interval.
- will need to implement redux later for menu and search instead of current use of this.state.

**02 21 19**
`current phase:`
  - FE Basic Navbar. ✅
  - BE + FE Homepage (Most recent posts - collapsed view, Votes).✅
  - FE Popular posts view. ✅

### Issues ###
- current posts info in FE only has the ID's of subshreddits and users. how to display the info? make another api call, or a JOIN call to fetch names of these ? a couple of JOINs will probably be best to do. ✅
- realized that I forgot to add img_url for subshredditts in DB. added using ALTER TABLE and UPDATE✅

**02 22 19**
- add voting functionality.✅
  - with every click activate corresponding UPDATE vote.✅
  - `UPDATE TableName SET TableField = TableField + 1 WHERE SomeFilterField = @ParameterID`✅

`current phase:`
  - FE Basic Navbar. ✅
  - BE + FE Homepage (Most recent posts - collapsed view, Votes). ✅
  - FE Popular posts view. ✅
`next phase:`
  1. FE Post-single post expanded view.
  2. BE + FE Comments, add new comment.
### Issues ###
  - timestamp convert to JS, need a module to display days ago, hours ago etc. found a npm react-timeago package. ✅

**02 23 19**
`current phase:`
1. FE Post-single post expanded view.
2. BE + FE Comments, add new comment.

**02 24 19**
`current phase:`
1. FE Post-single post expanded view. ✅
2. BE + FE Comments, add new comment.

- close button functionality : isOpen handler ✅
- seed comments DB, backend routing ✅
- comments per post fetch using redux. ✅

### Issues ###
- clicking on a vote also expands the post. preventing it
by putting an if statement in the expand handler to determine correct origin of event. ✅
- clicking close changes route to /post/ and doesn't show anything.✅
- css issue: text overflows outside of box. max-height✅
- sql issue - how to get poster username in comments ? used two joins on users table. ✅

**02 25 19**
`current phase:`
1. FE Post-single post expanded view. ✅
2. BE + FE Comments, ✅ add new comment.

- build a CommentDisplay component (similar structure to PostDisplay) ✅
- import into PostModal and map it in it. ✅
- change order posts by number of votes on the backend, rather than sorting on front end. ✅
- add voting functionality to comments ✅

**02 26 19**
`current phase:`
1. FE Post-single post expanded view. ✅
2. BE + FE Comments, ✅ add new comment.

`current-past phase:`
1. BE + FE Users, Login, Create, Delete.

- count comments SQL query ✅
- implement comment count on FE all Posts ✅
- walkthrough BE auth ✅

**02 27 19 - 03 03 19**
- implement FE authentication ✅
- redirect after loggedin✅
- login / signup routes. ✅
- fix logout routing. ✅
- add logged user get request + redux, call in navbar.✅
- map state of logged user to addcomment. ✅
- create Add Comment component.✅

`completed phase:`
1. FE Post-single post expanded view. ✅
2. BE + FE Comments,  add new comment. ✅

`past phase:`
1. BE + FE Users, Login, Create,✅ Delete.

### Issues ###
- comment count does not update when adding a comment ✅
- loggedUser.username undefined error ✅

**03 04 19 - 03 06 19**
`current phase:`
1. FE User Profile. ✅
2. BE + FE Following. ✅
3. BE + FE Create a post.

- protect BE routing for get all saved posts per user.✅
- implement "post a following".

### Issues ###
- fix nested routing
before mapping all posts. ✅
- post/:id renders modal,
BUT also all posts.
- route post/:id separately,
  to be appearing on top of current component.
- user profile does not mount when clicking on logged-in user in navbar. fixed using componentDidUpdate and a ternary. ✅

###GENERAL TASKS###
- redesign post/modal architecture to nested routing.
- handle login/signup errors display to user.
- adapt login/signup modals.
- update icons on navbar.
- update navbar buttons and avatar.
- fix Post routing.
(attn: line 53 in posts.js history.push last route)
- add links to users and subshreddits.
- add Votes table to db
- update the updateVotes functionality:
 - adds/deletes a row in votes table
 - adds/subtracts a vote in posts/columns table's votes column


  // last tasks:
  // 1. show and link follows at Navbar. V
  // 2. css Login / Signup page. V
  // 3. handle Login / Signup errors . V
  // 4. Css - buttons, navbar, addcomment . V
  // 5. handle vote clicks from user profile.
  // 6. save posts (like subscribe)
  // if there's time:
  // 7.   create post, subshreddit.
  // 8.   fix votes bug from users.
  // 9.   user page: nav bar + comments, saved posts.
  // 10.   fix post Modal in users.
  // 11. search functionality

  //saved posts:
  // redux-fetch all saved posts per loggedin user
  // connect to posts
  // add css to user profile
