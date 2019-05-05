-- \c shreddit;

-- ALTER TABLE Comments
-- ADD body VARCHAR;


-- UPDATE subshreddits SET img_url='https://upload.wikimedia.org/wikipedia/commons/1/16/Lifeisgood_logo15.png'
-- WHERE id=27

-- DELETE FROM follows WHERE id IN (6, 38);

INSERT INTO subshreddits(groupname, img_url)
VALUES('Music', 'https://www.bensound.com/bensound-img/happyrock.jpg'), ('Trolitics', 'https://betanews.com/wp-content/uploads/2014/05/politician-292x300.jpg'), ('Shoes', 'https://pumaimages.azureedge.net/images/191592/01/sv01/fnd/PNA/h/600/w/600'),
('Hiking', 'https://www.findatopdoc.com/var/fatd/storage/images/healthy-living/inspiring-man-with-becker-muscular-dystrophy-hikes-500-mile-spanish-trail/3695623-1-eng-US/Inspiring-Man-with-Becker-Muscular-Dystrophy-Hikes-500-Mile-Spanish-Trail_article_main.png'), ('Coding', 'https://images.readwrite.com/wp-content/uploads/2018/04/coding-825x500.jpg'), ('Philosophy', 'https://www.thoughtco.com/thmb/Lb8zx1sTAlntcqqLTrCwq3RHwRg=/800x0/filters:no_upscale():max_bytes(150000):strip_icc()/tax2_image_philosophy-58a22d1668a0972917bfb559.png'),
('LifeIsGood', 'https://upload.wikimedia.org/wikipedia/commons/1/16/Lifeisgood_logo15.png'), ('Random', 'https://www.lifewire.com/thmb/tJCIpF-chKxWvl0xjy-0ZuEI85E=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/random-numbers-over-blackboard-166043947-57bb63065f9b58cdfd31d1fe.jpg'), ('Murica', 'https://s8.postimg.cc/cmlm55y45/hamilton-white_2_1800x.jpg'), ('Canada', 'https://www.publicdomainpictures.net/pictures/50000/nahled/canadian-flag.jpg')
