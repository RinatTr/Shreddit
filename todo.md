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
4. plan how to GET all on FE (redux, API util etc, componentDidMount)
`current phase:`
  - FE Basic Navbar. ✅
  - BE + FE Homepage (Most recent posts - collapsed view, Votes).
  - FE Popular posts view.

### Issues ###
- Seed all fake posts at once gives them the same exact timestamp. Will need to seed a few new posts later to test correctly "sort by most recent posts" feature, or use time interval.
- will need to implement redux later for menu and search instead of current use of this.state.
