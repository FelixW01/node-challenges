const request = require('postman-request');

const geocode = (adress, callback) => {
    const accessToken = "pk.eyJ1IjoiZmVsaXh3aWxsZW0iLCJhIjoiY2xneWRxN2thMDhqeTNscGlxazZteDd3NSJ9.-h_-S4qFSy_pnbqneET0IA";
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