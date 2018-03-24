const BOT_NAME = 'yesdoubt';
const TOKEN = '80xdkjKkn02JgCic18Vmwe7M';

const outHandler = (req, res) => {
  const token = req.body.token;
  if (token !== TOKEN) {
    return res.status(200).end();
  }

  const userName = req.body.user_name;
  if (userName === BOT_NAME) {
    return res.status(200).end();
  }

  const text = req.body.text;
  if (text.indexOf('bruno mars') === -1) {
    return res.status(200).end();
  }

  const botPayload = {
    text: 'http://goo.gl/GL8UGi',
  };
  return res.status(200).json(botPayload);
};

export default outHandler;
