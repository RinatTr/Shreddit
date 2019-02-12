# Shreddit

## Minimum Viable Product
Shreddit is a simplified, shredded-down clone of reddit, built using React and express. By the end of the production period, this app will, at a minimum, include the following features:

* User sign up, login and delete account
* User profile view
* Posts: create, delete, save, hide and pin posts in subshreddits.
* Following.
* Comments.
* Upvotes/Downvotes, affecting order and popularity of posts.
* Popular posts view.
* Subreddit communities and user subscriptions.
* Search in overall posts and posts within a subreddit.

## Design Docs
* [Wireframes](./wireframes)
* [React Components](./Components.md)
* [API Endpoints](./API_Endpoints.md)
* [DB Schema](./Schema.md)

## Implementation Timeline

***Terminology:***

**BE - Backend:** Database, Dummy Data, Routes, Queries.

**FE - Frontend:** Routing, Components, API handlers, UI handlers, basic styling.

### Phase 1: Users (2 days) ###
`Objectives:`
1. BE + FE Users, Login, Create, Delete.

### Phase 2: Homepage and Feed (4 days) ###
`Objectives:`
1. FE Basic Navbar.
2. BE + FE Homepage (Posts - collapsed view, Votes).
4. FE Popular posts view.

### Phase 3: Posts and Comments (3 days) ###
`Objectives:`
1. FE Post-single post expanded view.
2. BE + FE Comments, add new comment.

### Phase 4: User Profile and Create Post (4 Days) ###
`Objectives:`
1. FE User Profile.
2. BE + FE Following.
3. BE + FE Create a post.

### Phase 5: Subshreddits and Navbar Menus (4 Days) ###
`Objectives:`
1. BE + FE Subshreddits and Subscriptions.
2. BE + FE Navbar complete menu (select).
3. FE Search overall posts, users, subshreddits and posts within a Subshreddit.

### Phase 6: Styling, Testing and Tweaks (3 Days) ###
`Objectives:`
1. FE Advanced CSS styling.
2. Comprehensive testing:
  * Complete UX flow.
  * Edge cases.
3. Final tweaks.

## Future Features
* Flairs (reddit "hashtags").
* Comment on comments.
* Private messaging.
* Trending Subjects.
* Customize main view (compact, expanded etc.).
* Responsive element adding / dropping in navbar.
* Sort posts.
* Night mode on/off.
