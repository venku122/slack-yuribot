var TOKEN = '9acvorsfKnqvrjy5AjzU3yKy';

module.exports = function (req, res, next) {
  var token = req.body.token;
  if (token !== TOKEN) {
    return res.status(200).end();
  }

  var roll = Math.floor(Math.random()*6) + 1;
  var botPayload = {
    response_type: 'in_channel',
    text: `You got ${roll}, dude!`,
  };
  return res.status(200).json(botPayload);
};
