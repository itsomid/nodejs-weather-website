const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecats')

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
//Setup handlebars engines and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Omid Shabani'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Omid Shabani'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Its a help text...',
        name: 'Omid Shabani'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
       return  res.send({
            error: 'you must provide address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if (error) {
            res.send({error})
        }
        else {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    res.send(error)
                }

                res.send({
                    location: location,
                    forecast: forecastData
                })
            })
        }

    })

})
app.get('/product', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'you must provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Omid Shabani',
        errorMessage: 'help article not found!'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Omid Shabani',
        errorMessage: 'Page not found!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})