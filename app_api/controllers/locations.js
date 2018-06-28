const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

/*
const locationsListByDistance = function (req, res) {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);
  //const maxDistance = parseFloat(req.query.maxDistance);
  const point = {
    type: "Point",
    coordinates: [lng, lat]
  };
  const geoOptions = {
    spherical: true,
    maxDistance: 20000,
    num: 10
  };
  if (!lng || !lat || !maxDistance) {
    console.log('locationsListByDistance missing params');
    res
      .status(404)
      .json({
        message : 'lng, lat and maxDistance query parameters are all required'
      });
    return;
  }
  Loc.geoNear(point, geoOptions, (err, results, stats) => {
    const locations = _buildLocationList(req, res, results, stats);
    console.log('Geo Results', results);
    console.log('Geo stats', stats);
    res
      .status(200)
      .json(locations);
  });
};
*/

const locationsListByDistance = function (req, res) {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);
  const maxDistance = parseFloat(req.query.maxDistance);
  const point = {
    type: "Point",
    coordinates: [lng, lat]
  };
  const geoOptions = {'$geoNear': {
    near: point,
    spherical: true,
    distanceField: 'dist.calculated',
    maxDistance: maxDistance,
    num: 10
  }};
  if (!lng || !lat || !maxDistance) {
    console.log('locationsListByDistance missing params');
    res
      .status(404)
      .json({
        message : 'lng, lat and maxDistance query parameters are all required'
      });
    return;
  }
  Loc.aggregate([geoOptions], (err, results) => {
      let locations = [];
      if (err) {
        res
          .status(404)
          .json(err)
      } else {
        results.forEach((doc) => {
          locations.push({
            distance: (doc.dist.calculated),
            name: doc.name,
            address: doc.address,
            rating: doc.rating,
            facilities: doc.facilities,
            _id: doc._id
          });
        });
        res
          .status(200)
          .json(locations);
      }
    });
}

const locationsCreate = function (req, res) {
  res
    .status(200)
    .json({"status" : "success"});
};

const locationsReadOne = function (req, res) {
  if (req.params && req.params.locationid) {
    Loc
      .findById(req.params.locationid)
      .exec((err, location) => {
        if (!location) {
          res
            .status(404)
            .json({
              "message": "locationid not found"
            });
          return;
        } else if (err) {
          res
            .status(404)
            .json(err);
          return;
        }
        res
          .status(200)
          .json(location);
      });
  } else {
    res
      .status(404)
      .json({
        "message": "No locationid in request"
      });
  }
};

const locationsUpdateOne = function (req, res) {
  res
    .status(200)
    .json({"status" : "success"});
}
const locationsDeleteOne = function (req, res) {
  res
    .status(200)
    .json({"status" : "success"});
}



module.exports = {
  locationsListByDistance,
  locationsCreate,
  locationsReadOne,
  locationsUpdateOne,
  locationsDeleteOne
};
