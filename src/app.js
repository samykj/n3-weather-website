const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");
const app = express()
const port = process.env.PORT || 3003


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
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/help', (req, res) => {
    res.render('help')
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error:"Please provide the address"
        });
    }
    geocode(req.query.address,(error,{ latitude,longitude,location }={})=>{
        if(error){
            console.log(error);
            return res.send({ error });
        }
        //order: lat long
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({ error });
            }
            res.send({
                address:req.query.address,
                forecast: forecastData,
                location
            })
        });
    });
})


app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port',port)
})