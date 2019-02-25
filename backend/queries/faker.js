const { db } = require("./q-index.js");
const faker = require("faker");

// let users = [];
//
// for (let i = 0; i < 25; i++) {
//   let username = faker.internet.userName();
//   let password_digest = faker.internet.password();
//   let avatar_url = 'https://api.adorable.io/avatars/285/'+username;
//   let email = faker.internet.email();
//   let str = `('${username}', '${password_digest}', '${avatar_url}', '${email}')`;
//   users.push(str);
// }

// let subshreddits = [];
// let names = ['Music','Trolitics','Shoes','Hiking','Coding','Philosophy','LifeIsGood','Random','Murica','Canada']
// for (let i = 0; i < 10; i++) {
//   let groupname = names[i];
//   let str = `('${groupname}')`;
//   subshreddits.push(str);
// }

// let posts = [];
//
// for (let i = 0; i < 100; i++) {
//   let poster_id = Math.floor(Math.random() * 25) + 1;
//   let subshreddit_id = Math.floor(Math.random() * 10) + 21;
//   let votes = Math.floor(Math.random() * 300);
//   let header = faker.lorem.words()
//   let body = faker.lorem.paragraph()
//   let str = `(${poster_id}, ${subshreddit_id}, '${votes}', '${header}', '${body}')`;
//   posts.push(str);
// }
let comments = [];

for (let i = 0; i < 75; i++) {
  let commenter_id = Math.floor(Math.random() * 29) + 1;
  let post_id = Math.floor(Math.random() * 100) + 1;
  let votes = Math.floor(Math.random() * 50);
  let body = faker.lorem.paragraph()
  let str = `(${commenter_id}, ${post_id}, '${votes}', '${body}')`;
  comments.push(str);
}

// users = users.join(", ");
// subshreddits = subshreddits.join(", ");
// posts = posts.join(", ");
comments = comments.join(", ");
// votes = votes.join(", ");
//
// db.none(
//   "DELETE FROM subshreddits WHERE id < 21"
// )
//   .catch(err => {
//     console.log(err);
//   });
db.none(
  "INSERT INTO comments(commenter_id, post_id, votes, body) VALUES " +
    comments +
    ";"
)
  .catch(err => {
    console.log(err);
  });