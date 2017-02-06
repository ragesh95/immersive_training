'use strict';
const logger = require('./../../applogger');
const router = require('express').Router();
const user = require('./userEntity');
//const userCtrl = require('./userController');

router.post('/add', function(req, res) {
    logger.debug("Inside user post");
    let db = new user(req.body);
    db.save();
    res.send('Added successfully');
});

router.post('/find', function(req, res) {
    user.findOne(req.body, function(err,docs){
      if(err){
        res.send("Error:"+err);
      }
      else if(docs!=null){
        res.send("correct");
      }
      else{
        res.send("incorrect");
      }
    });
});

router.post('/update', function(req, res) {
    user.update(req.body.old, req.body.new, function(err,docs){
      if(err){
        res.send("Error:"+err);
      }
      else if(docs!=null){
        res.send("changed");
      }
      else{
        res.send("not changed");
      }
    });
});

router.post('/findAll', function(req, res) {
    user.find(res.body, function(err,docs){
      if(err) {
        res.send("Error:"+err);
      }
      else {
        res.send(docs);
      }
    });
});

module.exports = router;
