/** @jsx React.DOM */

var React = require('react');
var TweetsApp = require('./components/TweetsApp.react');

var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

// Render the app (picking up where React left off on the server)
React.renderComponent(
  <TweetsApp tweets={initialState} />,
  document.getElementById('react-app')
);
