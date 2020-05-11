// const process = require("./nodemon.json")
const express = require('express');
const mongoose = require('mongoose');
var graphqlHTTP = require('express-graphql');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
const schema = require('./schema/schema')
// const multer = require('multer');
// var path = require('path');
// const bcrypt = require("bcrypt");
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

// Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// // The root provides a resolver function for each API endpoint
// var root = {
//     hello: () => {
//       return 'Hello world!';
//     },
//   };

// app.use("/graphql",graphqlHTTP({
//     schema : schema,
//     // rootValue : root,
//     graphiql : true
// }))

// app.listen(3001, () => { console.log('Server is running on port 3001') });

// const typeDefs = gql`

// type jobs {
//   companyId : Id!,
//   title : String!,
//   location : String!,
//   postedDate :  Date!,
//   deadlineDate : Date!,
//   salary : Number!,
//   category : String!
//   application : Array!
// }

// input Login {
//     email : String!,
//     password : String!
//  }
 
// input StudentSignup{
//   name : String!,
//   email : String!,
//   password : String!
// }

//  input CompanySignup{
//    name : String!,
//    email : String!,
//    password : String!,
//    location " String!
//  }
 
//  type Query{
//    getJobs(input : id) : [jobs]
//  }
//  `;

// const resolvers = {
//   Query: {
//     async getJobs(root,{
//       input
//     }) {
//       return await Jobs.find({
//         "application.studentId" : {$nin : [input.id]}
//       });
//     },
//   }
// }

// const server = new ApolloServer({ typeDefs, resolvers });
// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });
