const mong = require('mongoose');
// const connection = require('../../config');

var schema = new mong.Schema({
  userName : String,
  password : String
});

var Users = mong.model('users', schema);

module.exports = Users;
