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
2. BE + FE Comments, add new comment.
