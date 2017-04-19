require('dotenv').config();
var request = require('request');

var TOKEN = process.env.SLACK_INTEGRATION_TOKEN;
var NASAUrl = process.env.NASA_API_ROOT;
var botPayload = {
  response_type: 'ephemeral',
  text: 'You need to send a query yo',
  attachments: [
    {
      image_url: 'https://i.kinja-img.com/gawker-media/image/upload/s--VR6Tpx6J--/c_scale,fl_progressive,q_80,w_800/18r46ljz876m2jpg.jpg',
    },
  ],
};

module.exports = function (req, res, next) {
  var token = req.body.token;
  if (token !== TOKEN) {
    return res.status(200).end();
  }

  var query = req.body.text;
  if (!query) {
    return res.status(200).json(botPayload);
  }

  // send query to nasa api
  request(`${NASAUrl}/search?q=${query}&media_type=image`, (err, nasaRes, nasaBody) => {
    var items = JSON.parse(nasaBody).collection.items;
    if (items.length === 0) {
      return res.status(200).json(botPayload);
    }
    var item = items[0];
    var title = item.data[0].title;
    var description = item.data[0].description;
    var nasaImage = item.links[0].href;

    botPayload = {
      response_type: 'in_channel',
      text: `*${title}*`,
      mrkdwn: true,
      attachments: [
        {
          image_url: nasaImage,
        },
        {
          text: description,
        },
      ],
    };
    return res.status(200).json(botPayload);
  });
};
