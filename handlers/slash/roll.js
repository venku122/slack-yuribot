var TOKEN = 'r2gFaK5a25wh6VYL8vWzq2qJ';

module.exports = function (req, res, next) {
  var token = req.body.token;
  if (token !== TOKEN) {
    return res.status(200).end();
  }

  var roll: Math.floor(Math.random()*6) + 1;
  var botPayload = {
    text: 'You got ' + roll + ', dude!'
  };
  return res.status(200).json(botPayload);
}
