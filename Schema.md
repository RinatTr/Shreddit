# DB Schema

## Tables

**Users**
- Id: int primary key.
- Username: string.
- Password: string.
- Email: string.

**Follows**
- id: int primary key.
- follower_id: int references users(id)
- followed_id: int references users(id)

**Subscriptions**
- id: int primary key.
- user_id: int references users(id)
- group_id: int references subshreddits(id)

**Subshreddits**
- id: int primary key.
- groupname: string.

**Posts**
- id: int primary key.
- poster_id: int references users(id)
- timestamp: Date obj.
- votes: int.
- header: string.
- body: string.

**Comments**
- id: int primary key.
- commenter_id: int references users(id).
- post_id: int references users(id)
- votes: int.
- timestamp: Date obj.
