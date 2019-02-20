const { db } = require("./q-index.js");

const getAllSubshreddits = (req, res, next) => {
  db.any("SELECT * FROM Subshreddits")
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "got all subshreddits",
        users: data
      });
    })
    .catch(err => next(err));
};

module.exports = {
  getAllSubshreddits
};

/*
* `POST /api/subshreddit`
  * Creates new subshreddit community
* `GET /api/subshreddit/`
  * Get all subshreddits for search
* `GET /api/subshreddit/:id/posts`
  * Get all posts in a subshreddit
*/
