const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + address + '&units=metric&appid=592ac7dda53e79b2f1046df1526acd63'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to internet!', undefined)
        } else if (body.message) {

            callback(body.message, undefined)

        } else {

            callback(undefined, {
                latitude: body.coord.lat,
                longitude: body.coord.lon,
                location: body.name
            })
            // callback(undefined, response.body.weather[0].description + ". It is currently => " + response.body.main.temp + " degrees out (" + response.body.name + ' - ' + response.body.sys.country + ")")
        }
    })
}

module.exports = geocode