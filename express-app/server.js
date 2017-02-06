var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(request, response){
  response.send('Hello from Express');
});
app.get("/message",function(request,response){
  response.send("Hello from message");
});
app.get("/product/:a/:b",function(request,response){
  var a=request.params.a;
  var b=request.params.b;
  var c=(a*b)+"";
  response.send(c);
});
app.get("/add",function(req,res){
  var a=parseInt(req.query.num1);
  var b=parseInt(req.query.num2);
  var c=(a+b)+"";
  res.send(c);
});
app.get("/data",function(req,res){
  var myObj={"name":"Amit", "age":"26", "location":"Bangalore"};
  res.send(myObj);
});
app.get("/data/js",function(req,res){
  var myObj={"product":"Mobile", "price":"12000"};
  res.send(myObj);
});
app.post("/calculate/add",function(req,res){
  var a=parseInt(req.body.num1);
  var b=parseInt(req.body.num2);
  var c=(a+b)+"";
  res.send(c);
});
app.post("/calculate/add",function(req,res){
  var a=parseInt(req.body.num1);
  var b=parseInt(req.body.num2);
  var c=(a+b)+"";
  res.send(c);
});
app.post("/addFavourite",function(req,res){
  var id=req.body.resId;
  var name=req.body.resName;
  var desc=req.body.resDescription;
  var review=req.body.resReview;
  var reviewCount=req.body.resReviewCount;
  var image=req.body.resImage;
  var url=req.body.resUrl;
  res.send();
});
app.post("/deleteFavourite",function(req,res){
  var id=req.body.resId;
  res.send();
});
app.post("/updateComment",function(req,res){
  var id=req.body.resId;
  var comment=req.body.comment;
  res.send();
});
app.listen(8080);
