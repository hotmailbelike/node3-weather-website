const request = require('request');

const forecast = (latitide, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/34ed6400c36faae22455df286f5ac36a/' + latitide + ',' + longitude + '?units=si';
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to Connect to Weather services', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain');
    }
  });
};

module.exports = forecast;
