// const hbs = require('hbs');
const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public'));

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//suppose we have a domain of app.com and has 3 pages:
// app.com
// app.com/help
// app.com/about

//Set up handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to server
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather FISH!',
    name: 'Ja MOR!'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Another FIsh'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dolorem sunt iste optio. Harum molestiae, dolorum doloremque doloribus aliquam deleniti vel molestias dolor amet voluptate quaerat numquam veniam quam autem?',
    title: 'Help',
    name: 'fishliker'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'You must provide an address' });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error: error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error: error });
      }
      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
      });
    });
  });

  // res.send({
  //   forecast: 'Cool',
  //   location: 'amr basha',
  //   address: req.query.address
  // });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({ error: 'You must provide a search term' });
  }
  res.send({
    products: []
  });
});

// app.get('/', (req, res) => {
//   res.send('<h1>Fish</h1>');
// });

// app.get('/help', (req, res) => {
//   res.send({
//     name: 'Fish',
//     age: 16
//   });
// });

// app.get('/about', (req, res) => {
//   res.send('<h1>About Page</h1>');
// });

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: '404',
    name: 'fishliker2',
    errorMessage: 'Help article not found!'
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    title: '404',
    name: 'fishliker2',
    errorMessage: 'ERROR 404! Page not found!'
  });
});

//================================================================================================================

app.listen(3000, () => {
  console.log('Server is running in port 3000');
});
