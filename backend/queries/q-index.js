if (process.env.NODE_ENV !== 'production') {
    //for DEV: sets NODE_ENV to get env variables from local .env file
    require('dotenv').config();
  }
  
const pgp = require('pg-promise')({});
const db = pgp(process.env.DATABASE_URL || "postgres://localhost/shreddit");

module.exports = { db }
