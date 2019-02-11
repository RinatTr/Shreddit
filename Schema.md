# DB Schema

## Tables

**Users**
- Id: serial primary key.
- Username: string.
- Password: string.
- Email: string.
- timestamp: date.

**Follows**
- id: serial primary key.
- follower_id: int references users(id)
- followed_id: int references users(id)

**Subscriptions**
- id: serial primary key.
- subscriber_id: int references users(id)
- subshreddit_id: int references subshreddits(id)

**Subshreddits**
- id: serial primary key.
- groupname: string.

**Posts**
- id: serial primary key.
- poster_id: int references users(id)
- subshreddit_id: int references subshreddits(id)
- timestamp: Date obj.
- votes: int.
- header: string.
- body: string.
- img_url: string.
- is_pinned: boolean.

**Saved Posts**
- id: serial primary key.
- user_id: int references users(id)
- post_id: int references posts(id)

**Comments**
- id: serial primary key.
- commenter_id: int references users(id).
- post_id: int references users(id)
- votes: int.
