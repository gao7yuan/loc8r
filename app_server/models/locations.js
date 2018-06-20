const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: String,
  address: String,
  rating: {
    type: Number,
    'default': 0
  },
  facilities: [String]
});
