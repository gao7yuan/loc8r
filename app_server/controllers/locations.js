const request = require('request');
const apiOptions = {
  server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://loc8r-yuangao.herokuapp.com';
}

/* GET 'home' page */
const homelist = function(req, res) {
  res.render('locations-list', {
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Find places to work with wifi near you!'
    },
    sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
    locations: [{
        name: 'HodgePodge Cafe',
        address: '6016 Bothell Way NE Suite J, Kenmore, WA 98028',
        rating: 5,
        facilities: ['Hot drinks', 'Food', 'Premium wifi'],
        distance: '100m'
    }, {
        name: 'Cafe Hero',
        address: '125 High Street, Reading, RG6 1PS',
        rating: 4,
        facilities: ['Hot drinks', 'Food', 'Premium wifi'],
        distance: '200m'
    }, {
        name: 'Burger Queen',
        address: '125 High Street, Reading, RG6 1PS',
        rating: 2,
        facilities: ['Food', 'Premium wifi'],
        distance: '250m'
    }]
  });
};

/*GET 'Location infor' page */
const locationInfo = function(req, res) {
  res.render('location-info', {
    title: 'HodgePodge Cafe',
    pageHeader: {
      title: 'HodgePodge Cafe'
    },
    sidebar: {
      context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
      callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
    },
    location: {
      name: 'HodgePodge Cafe',
      address: '6016 Bothell Way NE Suite J, Kenmore, WA 98028',
      rating: 5,
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      coords: {
        lat: 47.7581963,
        lng: -122.2652175
      },
      openingTimes: [{
        days: 'Tuesday - Sunday',
        opening: '11:00am',
        closing: '8:00pm',
        closed: false
      }, {
        days: 'Monday',
        closed: true
      }],
      reviews: [{
        author: ' Tovelo God ',
        rating: 5,
        timestamp: '16 May 2018',
        reviewText: 'Coffee is good. Wifi is good. Love the food too. I can\'t say enough good things about it.'
      }, {
        author: ' Shroud Grzeseik ',
        rating: 3,
        timestamp: '13 May 2018',
        reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
      }]
    }
  });
};

/* GET 'Add review page' */
const addReview = function(req, res) {
  res.render('location-review-form', {
    title: 'Review Starcups on Loc8r',
    pageHeader: { title: 'Review Starcups' }
  });
};

module.exports = {
  homelist,
  locationInfo,
  addReview
};
