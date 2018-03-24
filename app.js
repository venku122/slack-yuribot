const express = require('express');
const bodyParser = require('body-parser');
const inHandler = require('./handlers/in');
const outHandler = require('./handlers/out');
const yuriHandler = require('./handlers/slash/yuri');

const app = express();
const port = process.env.PORT || 3000;

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// handler mapping
app.post('/inhook', inHandler);
app.post('/outhook', outHandler);
app.post('/yuri', yuriHandler);

// error handler
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, () =>{
  console.log(`Slack bot listening on port ${port}`);
});
