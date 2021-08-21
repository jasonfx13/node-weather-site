const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3000;
const forecast = require('./utilities/forecast');
const geocode = require('./utilities/geocode');

// define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const templatePath = path.join(__dirname, '../templates/views')
const templatePartials = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', templatePath);
hbs.registerPartials(templatePartials);

// setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Jbot'
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Jbot'
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Jbot'
  })
});

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
    if(error) {
      return res.send({error});
    }

    forecast(longitude, latitude, (error, forecastData) => {
      if(error) {
        return res.send({error});
      }

      res.send({
        longitude,
        latitude,
        message: forecastData.message,
        location,
        address: req.query.address
      });
    });
  });
})

app.get('/products', (req, res) => {
  // const params = res.params;
  if(!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 - Help article not Found',
    name: 'jBot'
  });
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 - Page not Found',
    name: 'jBot'
  })
})

app.listen(port, () => {
  console.log('server up on port ' + port);
});
