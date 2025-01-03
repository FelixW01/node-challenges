const express = require('express');
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const PORT = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Felix Willem'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is some helpful message',
        title: 'Help',
        name: 'Felix Willem'

    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Felix Willem'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Felix Willem',
        errorMessage: 'Help article not found'
    })
})



app.get('/weather', (req, res) => {
    const { address, unit } = req.query;

    if (!address) {
        return res.send({
            error: 'You must provide an address!'
        })
    } 

    geocode(address, (err, { latitude, longitude, location }) => {
        if (err) {
            return res.send({ err })
        }

        forecast(latitude, longitude, unit, (err, forecastData) => {
            if (err) {
                return res.send({ err })
            }

            res.send({
                forecast: forecastData,
                location,
                address: address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Felix Willem',
        errorMessage: 'Page not found'
    })
})

app.listen(PORT, () => {
    console.log('Server is up on port 3000.')
})