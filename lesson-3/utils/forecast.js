    const request = require('postman-request');

    const forecast = (latitude, longitude, callback) => {
    const apiKey = "ba29425027df9e4547d118ecaa124d8b";
    const url = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${latitude},${longitude}&units=f`;

    request({url: url, json: true}, (err, {body}) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.err) {
            callback('Unable to find location', undefined)
        }
        else {
            const currentData = body.current
            callback(undefined, `${body.location.name}: It is currently ${currentData.temperature}°F. There is a ${currentData.precip}% chance of rain.`);
        }
    })
    }

    module.exports = forecast