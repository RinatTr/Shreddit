const express = require('express');
const bodyParser = require('body-parser')
const users = require('./routes/users.js')
const app = express()

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/users', users)

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3100, () => {
  console.log('Shreddit: listening to 3100');
})
