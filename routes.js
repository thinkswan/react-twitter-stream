var JSX = require('node-jsx').install();
var React = require('react');
var TweetsApp = require('./components/TweetsApp.react');
var Tweet = require('./models/Tweet');

var Routes = {
  index: function(req, res) {
    // Fetch tweets from the database
    Tweet.getTweets(0, 0, function(tweets, pages) {
      var markup = React.renderComponentToString(
        TweetsApp({ tweets: tweets })
      );

      res.render('home', {
        markup: markup,
        state: JSON.stringify(tweets)
      });
    });
  },

  page: function(req, res) {
    // Fetch certain page of tweets from the database
    Tweet.getTweets(req.params.page, req.params.skip, function(tweets) {
      res.send(tweets);
    });
  }
}

module.exports = Routes;
