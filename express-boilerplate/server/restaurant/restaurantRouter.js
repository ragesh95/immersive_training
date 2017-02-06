'use strict';
const logger = require('./../../applogger');
const router = require('express').Router();
const restaurant = require('./restaurantEntity');
//const userCtrl = require('./restaurantController');

router.post('/addrestaurant', function(req, res) {
  var id=req.body.resId;
  if(isNaN(id)){
    res.send("Invalid ID");
    return;
  }
  var name=req.body.resName;
  if(name === '' || !isNaN(name)){
    res.send("Invalid Name");
    return;
  }
  var desc=req.body.resDescription;
  if(desc === '' || !isNaN(desc)){
    res.send("Invalid Description");
    return;
  }
  var review=req.body.resReview;
  var reviewCount=req.body.resReviewCount;
  var image=req.body.resImage;
  var url=req.body.resUrl;
  var comments=req.body.resComments;
  var db = new restaurant(req.body);
  db.save(function(err){
    if(err){
      res.send("Error:"+err);
    }
    else{
      res.send("Added Sucessfully");
    }
  });
});

router.delete('/deleterestaurant', function(req, res) {
  var id=req.body.resId;
  if(isNaN(id)){
    res.send("Invalid ID");
    return;
  }
  restaurant.remove(req.body, function(err, docs){
    if(err){
      res.send("Error:"+err);
    }
    else{
      res.send("Deleted Sucessfully");
    }
  });
});

router.put('/updaterestaurant', function(req, res) {
  var id=req.body.resId;
  if(isNaN(id)){
    res.send("Invalid ID");
    return;
  }
  var comment=req.body.resComments;
  restaurant.update({"resId":id}, {"resComments":comment}, function(err){
    if(err){
      res.send("Error:"+err);
    }
    else{
      res.send("Updated Sucessfully");
    }
  });
});

router.get('/getrestaurant', function(req, res) {
  restaurant.find(function(err,docs){
    if(err){
      res.send("Error:"+err);
    }
    else{
      res.send(docs);
    }
  });
});

module.exports = router;
