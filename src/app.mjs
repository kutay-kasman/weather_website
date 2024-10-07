import express from 'express'
import hbs from 'hbs'
import geocode from './utils/geocode.mjs'
import forecast from './utils/forecast.mjs'

//https://api.weatherstack.com/current?access_key=14619be22410b8d751ae5fe8532f44cb&query=istanbul
const app = express();
const port = process.env.PORT || 3000 // if the first one fails it will serve in 3000

//setup handlebar engine and views location
app.set('views', '/Users/Kutay Murat Kasman/Desktop/nodeJs/web-server/public/templates/views')
app.set('view engine', 'hbs')
hbs.registerPartials('/Users/Kutay Murat Kasman/Desktop/nodeJs/web-server/public/templates/partials')

//setup static directory to serve
app.use(express.static('/Users/Kutay Murat Kasman/Desktop/nodeJs/web-server/public'))

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather' ,
        name: 'Kutay Murat Kasman',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Kutay Murat Kasman'
    })
    })

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Kutay Murat Kasman'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address.'
        })
    }
    geocode(req.query.address, (error, {latitute, longtitude, location} = {}) => {
        if(error) {
            res.send({error})
        }
        else {
            forecast(latitute, longtitude, (error, {weather_description, temperature, precip}) => {
                if(error) {
                    res.send({error})
                }
                const hava_durumu = `Today's weather in ${req.query.address} is  ${weather_description}, with a temperature of ${temperature} degrees Celsius and a ${precip}% chance of precipitation.`  
                res.send({
                    forecast: hava_durumu,
                    location,
                    address: req.query.address
                })
            })
        }
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Kutay Murat Kasman', 
        errorMessage: 'Help article couldn\'t found!'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kutay Kasman',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on ' + port);
});
