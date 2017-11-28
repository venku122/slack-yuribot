require('dotenv').config();

var TOKEN = process.env.SLACK_INTEGRATION_TOKEN;
var NASA_API_KEY = process.env.NASA_API_KEY;

var apod = require('apod');
apod.apiKey = NASA_API_KEY;

function getTodaysImage() {
    /*
    Need to have your api key in the environment variables like so
        NASA_API_KEY : someRandomStringOfCharsAndNumbers
    Gets the date and tries to get the image
    :return: json with file information
    */

    //Gets the current date
    date = datetime.datetime.now()
    year = date.year
    month = date.month
    day = date.day
    return apod(year, month, date, (err, image) => {
        return (
            {
                'attachments': [
                {
                    'image_url': image.url,
                    'title' : image.title,
                    'text' : image.explanation
                }
                ]
            }
        )
    });
}

module.exports = function (req, res, next) {
  var token = req.body.token;
  if (token !== TOKEN) {
    return res.status(200).end();
  }

  var botPayload = getTodaysImage();
  return res.status(200).json(botPayload);
};
