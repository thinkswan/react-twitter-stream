var mongoose = require('mongoose');

// Create a new schema for tweets
var schema = new mongoose.Schema({
  twid       : String,
  active     : Boolean,
  author     : String,
  avatar     : String,
  body       : String,
  date       : Date,
  screenname : String
});

var Tweet = mongoose.model('Tweet', schema);

// Return tweets from the database
schema.statics.getTweets = function(page, skip, callback) {
  var tweets = [];
  var start = (page * 10) + (skip * 1);

  // Query the database (use skip and limit to achieve page chunks)
  Tweet.find(
      {},
      'twid active author avatar body date screenname',
      { skip: start, limit: 10 }
    )
    .sort({ date: 'desc' })
    .exec(function(err, docs) {
      if (!err) {
        tweets = docs;
        tweets.forEach(function(tweet) {
          tweet.active = true;
        });
      }

      callback(tweets);
  });
};

module.exports = Tweet;
