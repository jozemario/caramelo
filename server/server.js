'use strict';



var http = require('http');
var express = require('express');
var app = express();
var path = require('path');
var server = http.createServer(app);
var io = require('socket.io').listen(server); // Pass a http.Server instance tothe listen method
var sql = require("seriate");
var mysql = require('mysql');
var Q = require('q');
var router = express.Router();
var jwt = require('jsonwebtoken');
var ejwt = require('express-jwt');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors'); //after the line var bodyParser = require('body-parser');
app.use(cors()); //after the line app.use(logger('dev'));
var port = process.env.PORT || 3500;

app.use(bodyParser.json()); // use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true })); //false ==> true
app.use(cookieParser());

var _ = require('lodash');
//var authconfig  = require('./authConfig');
//var configjwt  = require('./config');

//GRAPHQL
var _graphql = require('graphql');

var _graphqlSubscriptions = require('graphql-subscriptions');

var _subscriptionsTransportWs = require('subscriptions-transport-ws');

var _require = require('apollo-server-express'),
    graphqlExpress = _require.graphqlExpress,
    graphiqlExpress = _require.graphiqlExpress;

var _require2 = require('graphql-tools'),
    makeExecutableSchema = _require2.makeExecutableSchema;

// Some fake data


var _books = [{
  title: "Harry Potter and the Sorcerer's stone",
  author: 'J.K. Rowling'
}, {
  title: 'Jurassic Park',
  author: 'Michael Crichton'
}];

// The GraphQL schema in string form
var typeDefs = '\n  type Query { books: [Book] }\n  type Book { title: String, author: String }\n';

// The resolvers
var resolvers = {
  Query: { books: function books() {
      return _books;
    } }
};

// Put together a schema
var schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql',
  subscriptionsEndpoint: 'ws://localhost:3500/subscriptions'
}));

//WebSocket subscriptions endpoint

//
var pubsub = new _graphqlSubscriptions.PubSub();
// Wrap the Express server

var ws = http.createServer(app);

//WebSocket subscriptions endpoint
//GRAPHQL






//XSD validation for node.js using libxml.


/* DBCONFIG */
var config = {
  "server": "localhost",
  "user": "user",
  "password": "password",
  "database": "database",
  "connectionTimeout": 1500000,
  "requestTimeout": 1500000,
  "pool": {
    "max": 100,
    "min": 1,
    "idleTimeoutMillis": 30000
  }
};
sql.setDefaultConfig(config);


/* DBCONFIG */


/* SERVE STATIC FILES */
// Expose the node_modules folder as static resources (to access socket.io.js in the browser)
//app.use('/static', express.static('node_modules'));


app.use(express.static('../client/dist/'));
// Register the index route of your app that returns the HTML file
app.get('/', function (req, res) {
  console.log("Homepage");
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

/* SERVE STATIC FILES */
/* ROUTES */
app.use(require('./routes/user-routes'));

app.all('*', function (req, res) {
  console.log('Accessing the secret section ...');
  res.redirect('/');
});
/* ROUTES */

/*MIDDLEWARE*/


// The server should start listening
/*server.listen(port, function (err) {
  console.log('Server listening in http://localhost:' + port);
  console.log('Go to http://localhost:' + port + '/graphiql to run queries!');

});*/

// The WS server should start listening
ws.listen(port, function () {

  console.log('Server listening in http://localhost:' + port);
  console.log('Go to http://localhost:' + port + '/graphiql to run queries!');
  console.log('GraphQL Server is now running on http://localhost:' + port);
  // Set up the WebSocket for handling GraphQL subscriptions
  new _subscriptionsTransportWs.SubscriptionServer({
    execute: _graphql.execute,
    subscribe: _graphql.subscribe,
    schema: schema
  }, {
    server: ws,
    path: '/subscriptions'
  });
});
