var Tweet = require('../models/Tweet');

var StreamHandler = function(stream, io) {
  // Whenever the stream handler passes new tweets...
  stream.on('data', function(data) {
    var tweet = {
      twid: data['id'],
      active: false,
      author: data['user']['name'],
      avatar: data['user']['profile_image_url'],
      body: data['text'],
      date: data['created_at'],
      screenname: data['user']['screen_name']
    };

    var tweetModel = new Tweet(tweet);

    // Save the new tweet to the database
    tweetModel.save(function(err) {
      if (!err) {
        // Notify client app of new tweet
        io.emit('tweet', tweet);
      }
    });
  });
};

module.exports = StreamHandler;
