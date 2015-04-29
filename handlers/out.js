var BOT_NAME = 'always-chicken';
var TOKEN = '6J09yxyd5IpCNjzQfm5XOG8q';

module.exports = function (req, res, next) {
  var token = req.body.token;
  if (token !== TOKEN) {
    return res.status(200).end();
  }

  var userName = req.body.user_name;
  if (userName === BOT_NAME) {
    return res.status(200).end();
  }

  var botPayload = {
    text : 'Hello, ' + userName + '!'
  };
  return res.status(200).json(botPayload);
}
