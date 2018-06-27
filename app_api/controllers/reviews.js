const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const reviewsCreate = function (req, res) { };

module.exports = {
  reviewsCreate,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne
};
