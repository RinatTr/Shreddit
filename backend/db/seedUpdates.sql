\c shreddit;

-- ALTER TABLE Comments
-- ADD body VARCHAR;

SELECT posts.id AS post_id, COUNT(comments.id) AS comments_count FROM Comments
        JOIN posts ON comments.post_id = posts.id
        GROUP BY posts.id
