const mong = require('mongoose');
// const connection = require('../../config');

var schema = new mong.Schema({
  resId : Number,
  resName : String,
  resDescription : String,
  resReview : Number,
  resReviewCount : Number,
  resImage : String,
  resUrl : String,
  resComments : String
});

var restaurants = mong.model('restaurants', schema);

module.exports = restaurants;
