import express from 'express';
import hbs from 'hbs';
import path from 'path';
import geocode from './utils/geocode.mjs';
import forecast from './utils/forecast.mjs';
import { fileURLToPath } from 'url'; // Import to work with import.meta.url

// Initialize express app
const app = express();
const port = process.env.PORT || 3000; // Set the port

// Get the directory name equivalent for ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up paths for Express using path.join
// Go up one level from 'src' to 'public/templates'
const viewsPath = path.join(__dirname, '../public/templates/views');
const partialsPath = path.join(__dirname, '../public/templates/partials');
const staticPath = path.join(__dirname, '../public');

// Setup Handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(staticPath));

// Define routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kutay Murat Kasman',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Kutay Murat Kasman'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Kutay Murat Kasman'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address.'
        });
    }
    geocode(req.query.address, (error, { latitute, longtitude, location } = {}) => {
        if (error) {
            res.send({ error });
        } else {
            forecast(latitute, longtitude, (error, {location_name, location_region, weather_description, temperature, precip, humidity, observation_time }) => {
                if (error) {
                    res.send({ error });
                }
                const hava_durumu = `Currently, weather in ${location_name} is ${weather_description}, with a temperature of ${temperature} degrees Celsius. 
                \nThere has been ${precip}mm of rain. Humidity is ${humidity}% \n\n Observed at ${observation_time} UTC`;
                res.send({
                    location,
                    address: req.query.address,
                    forecast: hava_durumu
                });
            });
        }
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Kutay Murat Kasman',
        errorMessage: 'Help article couldn\'t found!'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kutay Murat Kasman',
        errorMessage: 'Page not found'
    });
});

// Start the server
app.listen(port, () => {
    console.log('Server is up on ' + port);
});
