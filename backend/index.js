const express = require('express');
const mongoose = require('mongoose');
var graphqlHTTP = require('express-graphql');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
const schema = require('./schema/schema')
var cookieParser = require('cookie-parser');
var cors = require('cors');
const { mongoDB } = require('./config');


app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_graphql_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

app.use(cookieParser());
app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
    next();
});


app.use(express.json()); // Make sure it comes back as json

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 500,
  bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
      console.log(`MongoDB Connection Failed`);
  } else {
      console.log(`MongoDB Connected`);
  }
});

app.use("/graphql",graphqlHTTP({
  schema,
  graphiql: true
}));


app.listen(3001, ()=>{
  console.log("GraphQL server started on port 3001");
})