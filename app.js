var express = require('express');
var bodyParser = require('body-parser');
var outHandler = require('./handlers/outgoing');
var inHandler = require('./handlers/ingoing');
var slashHandler = require('./handlers/slash');
 
var app = express();
var port = process.env.PORT || 3000;
 
// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
 
// test route
app.post('/outhook', outHandler);
app.post('/inhook', inHandler);
app.post('/slash', slashHandler);
 
// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});
 
app.listen(port, function () {
  console.log('Slack bot listening on port ' + port);
})
