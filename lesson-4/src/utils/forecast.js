    const request = require('postman-request');
    require('dotenv').config()

    const forecast = (latitude, longitude, unit, callback) => {
    const apiUnit = unit === 'fahrenheit' ? 'f' : 'm'; 
    const unitSymbol = apiUnit === 'f' ? '°F' :  '°C'
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${latitude},${longitude}&units=${apiUnit}`;
    
    
    
    request({url: url, json: true}, (err, {body}) => {
        console.log(body, '<<<< body')
        if (err) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.err) {
            callback('Unable to find location', undefined)
        }
        else {
            const currentData = body.current
            callback(undefined, `${body.current.weather_descriptions}, It is currently ${currentData.temperature}${unitSymbol}. There is a ${currentData.precip}% chance of rain.`);
        }
    })
    }

    module.exports = forecast