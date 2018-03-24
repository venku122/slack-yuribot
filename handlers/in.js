const request = require('request');

const HOOK_URL = 'https://hooks.slack.com/services/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';

const inHandler = (req, res) => {
  const text = req.body.text;
  const botPayload = {
    text,
  };

  const options = {
    url: HOOK_URL,
    method: 'POST',
    headers: {'Content-Type': 'urlencode'},
    form: 'payload=' + JSON.stringify(botPayload)
  };

  // Start the request
  request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      return res.status(200).end();
    }
  });
};

export default inHandler;
