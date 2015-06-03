# react-twitter-stream

A React app that displays a live Twitter feed.

Based on the tutorial found at
https://scotch.io/tutorials/build-a-real-time-twitter-stream-with-node-and-react-js.

## Demo

View a live demo at https://react-twitter-stream.herokuapp.com/.

## How to use

#### Clone the repo

```
git clone git@github.com:thinkswan/react-twitter-stream.git
```

#### Generate a Twitter consumer key, secret, and access token

1. Create a new Twitter app at https://apps.twitter.com/app/new
1. Visit the **Keys and Access Tokens** tab
1. Generate a consumer key, secret, and access token
1. Add the generated keys to `config/default.json-example`
1. Rename the config file: `mv config/default.json-example config/default.json`

#### Install MongoDB

* http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/
* http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/
* http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/

#### Build the project

```
npm install
npm run build
npm start
```

This will start a server at http://localhost:5000/.

## How to deploy

Click the button below to spin up your own copy of the app in a Heroku
instance.

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

Once the app is deployed and you have the app name, you must set your generated
Twitter keys as Heroku environment variables.

```
heroku config:set TWITTER_CONSUMER_KEY=<consumer_key> --app=<app_name>
heroku config:set TWITTER_CONSUMER_SECRET=<consumer_secret> --app=<app_name>
heroku config:set TWITTER_ACCESS_TOKEN_KEY=<access_token_key> --app=<app_name>
heroku config:set TWITTER_ACCESS_TOKEN_SECRET=<access_token_secret> --app=<app_name>
```

The app will now be live at `https://<app_name>.herokuapp.com/`.

## How it works

The server (`server.js`) runs an Express app that watches Twitter for new tweets
matching a keyword (eg. `canada`). When a new tweet is found, the `StreamHandler`
class saves the tweet to the database and uses Socket.IO to emit the new tweet
to the client.

The client (`app.js`) is a React app that listens for the `tweet` event and
renders new tweets as they arrive. It also uses infinite scrolling to load
subsequent pages of old tweets.

State is maintained by using a Mongo database to store all previously-fetched
tweets.

## License

MIT
