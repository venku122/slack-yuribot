require('dotenv').config();
const request = require('request');

const TOKEN = process.env.SLACK_INTEGRATION_TOKEN;
const NASAUrl = process.env.NASA_API_ROOT;
const notFoundPayload = Object.freeze({
  response_type: 'ephemeral',
  text: 'There was an issue with your query',
  attachments: [
    {
      image_url: 'https://i.kinja-img.com/gawker-media/image/upload/s--VR6Tpx6J--/c_scale,fl_progressive,q_80,w_800/18r46ljz876m2jpg.jpg',
    },
  ],
});

const yuriHandler = (req, res) => {
  const reqToken = req.body.token;
  if (reqToken !== TOKEN) {
    return res.status(200).end();
  }

  const query = req.body.text;
  if (!query) {
    return res.status(200).json(notFoundPayload);
  }

  // send query to nasa api
  request(`${NASAUrl}/search?q=${query}&media_type=image`, (err, nasaRes, nasaBody) => {
    const items = JSON.parse(nasaBody).collection.items;
    if (items.length === 0) {
      return res.status(200).json(notFoundPayload);
    }
    const index = Math.floor(Math.random() * items.length);
    const item = items[index];
    const title = item.data[0].title;
    const description = item.data[0].description;
    const nasaImage = item.links[0].href;

    const botPayload = {
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

export default yuriHandler;
