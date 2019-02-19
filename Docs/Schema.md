# DB Schema

## Tables

**Users**
- Id: serial primary key.
- Username: string UNIQUE NOT NULL.
- Password: string.
- Avatar_url: string.
- Email: UNIQUE NOT NULL.
- created_at: timestamp (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)

**Follows**
- id: serial primary key.
- follower_id: int references users(id)
- followed_id: int references users(id)

**Subshreddits**
- id: serial primary key.
- groupname: string.

**Subscriptions**
- id: serial primary key.
- subscriber_id: int references users(id)
- subshreddit_id: int references subshreddits(id)

**Posts**
- id: serial primary key.
- poster_id: int references users(id)
- subshreddit_id: int references subshreddits(id)
- created_at: TIMESTAMP
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
- post_id: int references posts(id)
- votes: int.
- created_at: TIMESTAMP
