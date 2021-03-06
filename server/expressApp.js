const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
require('dotenv').config();

const schema = require('./schema');

const app = express();

// Allow cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

// parse request body and cookies
app.use(bodyParser.json({ limit: '4MB' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('build'));

// graphql
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

// our routes

app.get('/*', (req, res) => {
  // res.sendFile(path.join(__dirname, '../build/index.html'));
  res.send('its live').status(200);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  console.error(err);
});

module.exports = app;
