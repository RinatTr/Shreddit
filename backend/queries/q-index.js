const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost/shreddit');

module.exports = { db }
