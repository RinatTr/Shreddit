# API Endpoints

## JSON API

### Users
* `GET /api/users/`
  * Fetches all users for search
* `POST /api/users/`
  * Creates new user
* `GET /api/users/:userId`
  * Fetches single existing user data
* `PATCH /api/users/:userId`
  * Allows user to update their profile

### Subshreddits
* `POST /api/subshreddit`
  * Creates new subshreddit community
* `GET /api/subshreddit/`
  * Get all subshreddits for search
* `GET /api/subshreddit/:id/posts`
  * Get all posts in a subshreddit

### Follows
* `GET /api/follows/:userId`
  * Fetches all users followed by a single user
* `POST /api/follows/`
  * adds a following
* `DELETE /api/follows/`
  * deletes a following (unfollow / unsubscribe)

### Subscriptions
* `GET /api/subscriptions/:userId`
  * Fetches all subshreddits subscribed to by a single user
* `GET /api/subscriptions/:id`
  * Fetches all subscribed users for a subshreddit
* `POST /api/subscriptions/`
  * adds a subscription
* `DELETE /api/subscriptions/`
  * deletes a subscription (unfollow / unsubscribe)

### Posts and Comments
* `GET /api/posts/`
  * Fetches all posts
* `GET /api/users/:userId/posts/`
  * Fetches all posts by user
* `GET /api/users/:userId/posts/saved`
  * Fetches all saved posts by a user
* `POST /api/posts/`
  * Add a new post
* `GET /api/posts/:id`
  * Get a single post
* `GET /api/posts/:id/comments`
  * Get all comments for a single post
* `DELETE /api/posts/:id`
  * Delete a post
* `POST /api/posts/:id/comments`
  * Add a comment for a single post
* `DELETE /api/posts/:id/comments`
  * Delete a comment for a single post
* `GET /api/users/:userId/comments`
  * Fetches all comments by user
* `GET /api/comments/counts`
  * Fetches all comment counts for all posts
