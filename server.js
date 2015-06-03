// Require our dependencies
var config = require('config');
var express = require('express');
var exphbs = require('express-handlebars');
var http = require('http');
var mongoose = require('mongoose');
var twitter = require('ntwitter');
var routes = require('./routes');
var streamHandler = require('./utils/streamHandler');

// Create an Express instance and set a port variable
var app = express();
var port = process.env.PORT || 5000;

// Set Handlebars as the templating engine and disable etag headers
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.disable('etag');

// Configure routes
app.get('/', routes.index);
app.get('/page/:page/:skip', routes.page);
app.use('/', express.static(__dirname + '/public/'));

// Start the server
var server = http.createServer(app).listen(port, function() {
  console.log('Server is running at http://localhost:' + port);
});

// Initialize Socket.io
var io = require('socket.io').listen(server);

// Create an ntwitter instance
var twitterConfig = {
  consumer_key:        process.env.TWITTER_CONSUMER_KEY || config.get('twitter.consumer_key'),
  consumer_secret:     process.env.TWITTER_CONSUMER_SECRET || config.get('twitter.consumer_secret'),
  access_token_key:    process.env.TWITTER_ACCESS_TOKEN_KEY || config.get('twitter.access_token_key'),
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || config.get('twitter.access_token_secret')
};
var twit = new twitter(twitterConfig);

// Set a stream listener for tweets matching certain keywords
twit.stream('statuses/filter', { track: 'canada' }, function(stream) {
  streamHandler(stream, io);
});

// Connect to Mongo database
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/react-twitter-stream');
