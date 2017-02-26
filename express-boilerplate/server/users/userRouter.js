'use strict';
const logger = require('./../../applogger');
const router = require('express').Router();
const user = require('./userEntity');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const nodemailer = require('nodemailer');
let host = "localhost:8080";
const userDoc = require('./userDocEntity').model;
//const userCtrl = require('./userController');

router.post('/adduser',function(req,res){
 let User = new userDoc({
   "emailId": "ragesh.1995@gmail.com",
    "profile" : {
      "description" : "I am here to evolve me on technology",
      "gender" : "male",
      "address" : {
        "Line1" : "Dharapuram",
        "country" : "India",
        "region" : "Tamil nadu",
        "city" : "Tirupur",
        "postalCode" : "638702"
      }
    }
 });
 User.save(function(err){
   if(err){
     res.send("Error:"+err);
   }
   else{
     res.send("Success");
   }
 });
});

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

router.post('/login',passport.authenticate('local', {
      failureFlash: 'Invalid Username and Password',
      successFlash: "Welcome to foodie App"
   }),function(req, res) {
         res.json({responseText:'authenticated'});
      });

router.get('/logout', function(req, res){
  console.log('Session deleted');
  req.session.destroy();
  res.send({redirect: '/'});
});

router.post('/send', function invitefrnds(req, res) {
       console.log(req.body.data);
       var transporter = nodemailer.createTransport({
           /*eslint-disable */
           service: 'Gmail',
           secure: false,
           auth: {
               user: 'geniegenie0001@gmail.com', // Your email id
               pass: 'genie123' // Your password
           },
           tls: {
               rejectUnauthorized: false
           }
       });

       host = req.get('host');
       /*eslint-disable */
      //  // var hashVID = bcrypt.hashSync(profile[0].local.verificationID, 10);
      //  var VID = profile[0].generateHashVID(profile[0].local.verificationID);
      //  /*eslint-enable */
      //  VIDcheck = VID;
      //  // var linkEmail = profile[0].generateHashEmail(profile[0].local.email);
      //  console.log(VID + ' is the VID');
      //  link = 'http://' + req.get('host') + '/users/verify?id=' + VID + '&email=' + profile[0].local.email;
      let link = 'http://' + req.get('host') + '/users/invited?email='+req.body.mail;
       var text = 'Hello from \n\n' + req.body.data;
       let mailOptions = {
           from: 'geniegenie0001@gmail.com', // sender address
           to: req.body.mail, // list of receivers
           subject: 'Invitation from Zynla', // Subject line
           text: text,
           html: '<center><h1>Welcome to Zynla</h1></center><br><br><br>'+
           'Hi,<br><br>This is the invitation to join in zynla.'+
           '<br><br><br><a href=' + link + ' style=background-color:#44c767 ;'+
           '-moz-border-radius:28px;-webkit-border-radius:28px;border-radius:28px;'+
           'border:1px solid #18ab29 ;display:inline-block;padding:16px 31px;'+
           'color:#ffffff ;text-shadow:0px 1px 0px #2f6627 ;'+
           'text-decoration:none;> Join </a><br><br>'
       };
       console.log(mailOptions + host);
       transporter.sendMail(mailOptions, function(error, info) {
           if (error) {
               console.log(error);
               console.log('Error')
           } else {
               console.log('Message sent: ' + info.response);
               res.json({yo: info.response});
           }
       });

   });

module.exports = router;
