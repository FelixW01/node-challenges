const request = require('postman-request');
require('dotenv').config()

const geocode = (adress, callback) => {
    const accessToken = process.env.GEO_API_KEY;
    const apiUrl = `https://api.mapbox.com/search/geocode/v6/forward?country=us&place=${encodeURIComponent(adress)}&access_token=${accessToken}`;

    request({ url: apiUrl, json: true }, (err, {body}) => {
        if (err) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to connect to location services!', undefined)
        } else {
            const coordinates = body.features[0].properties.coordinates;
            callback(undefined, {
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                location: body.features[0].properties.name
            });
        }
    });
};

module.exports = geocode