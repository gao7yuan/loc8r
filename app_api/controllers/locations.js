const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const locationsCreate = function (req, res) {
  res
    .status(200)
    .json({"status" : "success"});
};

module.exports = {
  locationsListByDistance,
  locationsCreate,
  locationsReadOne,
  locationsUpdateOne,
  locationsDeleteOne
};