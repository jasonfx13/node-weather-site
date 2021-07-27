const request = require('postman-request');

const forecast = (longitute, latitude, callback) => {

  const url = 'http://api.weatherstack.com/current?access_key=94d87fc0f5d672fc3c4d2214db87dc2d&query=' + latitude + ',' + longitute + '&units=f'

  request({ url, json: true }, (err, { body } = {}) => {
    if(err) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      const currentWeather = body.current;
      const currentWeatherMessage = currentWeather.weather_descriptions[0] + '. It is currently ' + currentWeather.temperature + '° out. It feels like ' + currentWeather.feelslike + '°. There is a ' + (currentWeather.precip * 100) + '% chance of rain.'

      const data = {
        message: currentWeatherMessage,
        current: body.current
      }

      callback(undefined, data);
    }

  })
}

module.exports = forecast;
