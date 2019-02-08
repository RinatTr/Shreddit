# DB Schema

## Tables

**Users**
- Id: int primary key.
- Username: string.
- Password: string.
- Email: string.
- timestamp: date.

**Follows**
- id: int primary key.
- follower_id: int references users(id)
- followed_id: int references users(id)

**Subscriptions**
- id: int primary key.
- user_id: int references users(id)
- subshreddit_id: int references subshreddits(id)

**Subshreddits**
- id: int primary key.
- groupname: string.

**Posts**
- id: int primary key.
- poster_id: int references users(id)
- subshreddit_id: int references subshreddits(id)
- timestamp: Date obj.
- votes: int.
- header: string.
- body: string.
- img_url: string.
- is_pinned: boolean.

**Saved Posts**
- id: int primary key.
- user_id: int references users(id)
- post_id: int references posts(id)

**Comments**
- id: int primary key.
- commenter_id: int references users(id).
- post_id: int references users(id)
- votes: int.
