var express = require('express');
var bodyParser = require('body-parser');
var inHandler = require('./handlers/in');
var outHandler = require('./handlers/out');
var yuriHandler = require('./handlers/slash/yuri');
var apodHandler = require('./handlers/slash/apod');

var app = express();
var port = process.env.PORT || 3000;
 
// body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
 
// handler mapping
app.post('/inhook', inHandler);
app.post('/outhook', outHandler);
app.post('/yuri', yuriHandler);
app.post('/apod', apodHandler);

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});
 
app.listen(port, function () {
  console.log('Slack bot listening on port ' + port);
});