const request = require('postman-request');

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1IjoiamZpc2hlcjEzMTMiLCJhIjoiY2tyZ3RuMHBnMGVybjJwcGt0dmV3cXFveSJ9.xgEJ7Tsbqji3lKApGIN3yw&limit=1'

  request({ url, json: true }, (err, { body } = {}) => {
    if (err) {
      callback('Unable to connect to location services', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location, try another search', undefined)
    } else {
      const data = {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      }
      callback(undefined, data)
    }
  })

}

module.exports = geocode;
