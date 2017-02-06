const should = require("chai").should(),
assert = require ("chai").assert,
supertest = require("supertest"),
app = require("../bin/www");

var url = supertest("http://localhost:8080");

describe("Testing routes", function(err){
 it("Add the restaurant", function(done){
   url
       .post("/restaurant/addrestaurant")
       .send({"resId":"10", "resName":"abc", "resDescription":"qwe", "resReview":"4.5", "resReviewCount":"1000", "resImage":"http://qwe.com", "resUrl":"http://abc.com"})
       .expect(200)
       .end(function(err,res){
         should.not.exist(err);
         (res.text).should.not.equal("Invalid ID","Id should be a number");
         (res.text).should.not.equal("Invalid Name","Invalid Name");
         (res.text).should.not.equal("Invalid Description","Invalid Description");
         (res.text).should.equal("Added Sucessfully","Expected value not matching with response");
         done();
       });

 });
 it("Reading the restaurant", function(done){
   url
       .get("/restaurant/getrestaurant")
       .send("")
       .expect(200)
       .end(function(err,res){
         should.not.exist(err);
         (res.text).should.equal("Read Sucessfully","Expected value not matching with response");
         done();
       });

 });
 it("Delete the restaurant", function(done){
   url
       .delete("/restaurant/deleterestaurant")
       .send({ "resId":"10" })
       .expect(200)
       .end(function(err,res){
         should.not.exist(err);
         (res.text).should.not.equal("Invalid ID","Id should be a number");
         (res.text).should.equal("Deleted Sucessfully","Expected value not matching with response");
         done();
       });

 });
 it("update the restaurant", function(done){
   url
       .put("/restaurant/updaterestaurant")
       .send({ "resId":"10", "resComment":"new comment" })
       .expect(200)
       .end(function(err,res){
         should.not.exist(err);
         (res.text).should.not.equal("Invalid ID","Id should be a number");
         (res.text).should.equal("Updated Sucessfully","Expected value not matching with response");
         done();
       });

 });
});
