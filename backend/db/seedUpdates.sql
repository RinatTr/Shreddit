\c shreddit;

-- ALTER TABLE Comments
-- ADD body VARCHAR;

-- SELECT posts.id AS post_id, COUNT(comments.id) AS comments_count FROM Comments
--         JOIN posts ON comments.post_id = posts.id
--         GROUP BY posts.id


-- UPDATE subshreddits SET img_url='https://upload.wikimedia.org/wikipedia/commons/1/16/Lifeisgood_logo15.png'
-- WHERE id=27

DELETE FROM follows;
