var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('hello word!');
});

app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === i_am_lord_voldemort_bot) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
});

app.listen(3000, function() {
  console.log('Server listening on port 3000')
});
