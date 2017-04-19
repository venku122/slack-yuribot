require('dotenv').config();

var TOKEN = process.env.SLACK_INTEGRATION_TOKEN;

module.exports = function (req, res, next) {
  var token = req.body.token;
  if (token !== TOKEN) {
    return res.status(200).end();
  }

  var botPayload = {
    response_type: 'in_channel',
    text: `Here is an issue, dude!`,
    attachments: [
      {
        image_url: 'https://i.kinja-img.com/gawker-media/image/upload/s--VR6Tpx6J--/c_scale,fl_progressive,q_80,w_800/18r46ljz876m2jpg.jpg',
      }
    ],
  };
  return res.status(200).json(botPayload);
};