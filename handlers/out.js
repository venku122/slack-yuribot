var BOT_NAME = 'slackbot';
var TOKEN = '6J09yxyd5IpCNjzQfm5XOG8q';

module.exports = function (req, res, next) {
  var botPayload = {
    text: userName
  };
  return res.status(200).json(botPayload);

  var token = req.body.token;
  if (token !== TOKEN) {
    return res.status(200).end();
  }

  var userName = req.body.user_name;
  if (userName === BOT_NAME) {
    return res.status(200).end();
  }

  // var text = req.body.text;
  // if (text.indexOf("sexy") === -1) {
  //   return res.status(200).end();
  // } 

  // var botPayload = {
  //   text: 'https://www.google.co.kr/search?q=sexy&newwindow=1&biw=1244&bih=682&source=lnms&tbm=isch&sa=X&ei=z81AVer4NYe4mwXFj4CgCw&ved=0CAYQ_AUoAQ'
  // };
  // return res.status(200).json(botPayload);
}
