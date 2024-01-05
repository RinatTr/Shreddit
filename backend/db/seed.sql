CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE NOT NULL,
  password_digest VARCHAR NOT NULL,
  avatar_url VARCHAR,
  email VARCHAR UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE follows (
  id SERIAL PRIMARY KEY,
  follower_id INT REFERENCES users(id),
  followed_id INT REFERENCES users(id)
);

CREATE TABLE subshreddits (
  id SERIAL PRIMARY KEY,
  groupname VARCHAR,
  img_url VARCHAR
);

CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  subscriber_id INT REFERENCES users(id),
  subshreddit_id INT REFERENCES subshreddits(id)
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  poster_id INT REFERENCES users(id),
  subshreddit_id INT REFERENCES subshreddits(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  votes INT,
  header VARCHAR NOT NULL,
  body VARCHAR
);

CREATE TABLE saved_posts (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  post_id INT REFERENCES posts(id)
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  commenter_id INT REFERENCES users(id),
  post_id INT REFERENCES posts(id),
  votes INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  body VARCHAR
);

INSERT INTO users (username, password_digest, avatar_url, email) VALUES
('piglet', '1234', 'https://api.adorable.io/avatars/200/94a48175813e415cb24f92fcc04347e1.png','chik@peak.co'),
('quincy', 'quincy123', 'https://api.adorable.io/avatars/200/46b64bf09825e951f8ccc6ce70236c08.png','quin@pro.co'),
('toothpicker', 'cavity1!', 'https://api.adorable.io/avatars/400/34bf7cb9bc1cca1ba1d0586894107181.png','arius@bak.tus')
-- ATTN: the Auth will fail for the above users since the saved password is not hashed and will fail during password comparison.