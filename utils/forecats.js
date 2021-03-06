const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=592ac7dda53e79b2f1046df1526acd63'
    request({url, json: true}, (error, {body}) => {
        if (error) {

            callback('Unable to connect to internet!', undefined)
        } else if (body.message) {
            callback(body.message, undefined)
        } else {
            // console.log(body)
            callback(undefined, body.weather[0].description + ". It is currently => " + body.main.temp + " degrees out." + " This high today is " + body.main.temp_max + " with low of " + body.main.temp_min)
        }
    })
}

module.exports = forecast