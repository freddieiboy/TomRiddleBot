var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('hello word!');
});

app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'i_am_lord_voldemort_bot') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
});

var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});
