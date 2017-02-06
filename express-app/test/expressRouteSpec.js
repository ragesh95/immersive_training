const should = require("chai").should(),
assert = require ("chai").assert,
supertest = require("supertest"),
app = require("../server");

var url = supertest("http://localhost:8080");

describe("Testing the first route", function(err){
  it("should handle the request", function(done){
    url
        .get("/")
        .expect(200)
        .end(function(err,res){
          if (err) {
				        throw err;
			    }
          res.text.should.equal("Hello from Express",res.text, "response text is not matching with test string!");
          done();
        });
  });

  });

describe("Testing the first route", function(err){
  it("should handle the request", function(done){
    url
        .get("/message")
        .expect(200)
        .end(function(err,res){
          if (err) {
                throw err;
          }
          res.text.should.equal("Hello from message",res.text, "response text is not matching with test string!");
          done();
        });
  });

  });


describe("Testing calculator route request parameter", function(err){
  it("should handle and send the computed info", function(done){
    url
        .get("/product/5/6")
        .expect(200)
        .end(function(err,res){
          should.not.exist(err);
          assert.equal(30,res.text, parseFloat(res.text));
          done();
        });

  });
});

describe("Testing calculator route query parameter", function(err){
  it("should handle and send the computed info", function(done){
    url
        .get("/add?num1=5&num2=10")
        .expect(200)
        .end(function(err,res){
          should.not.exist(err);
          assert.equal(15, res.text, parseFloat(res.text));
          done();
        });

  });
});


describe("Testing routes that return JSON", function(err){
  it("should handle and send the JSON data Part 1", function(done){
    url
        .get("/data")
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err,res){
          should.not.exist(err);
          var myObj = JSON.parse(res.text);
          myObj.name.should.be.equal("Amit");
          myObj.age.should.be.equal("26");
          myObj.location.should.be.equal("Bangalore");
          done();
        });

  });
  it("should handle and send the JSON data", function(done){
    url
        .get("/data/js")
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err,res){
          should.not.exist(err);
          var myObj = JSON.parse(res.text);
          myObj.product.should.be.equal("Mobile");
          myObj.price.should.be.equal("12000");
          done();
        });

  });


});


describe("Testing calculator POST route", function(err){
 it("should handle and send the computed info", function(done){
   url
       .post("/calculate/add")
       .send({ num1: "40", num2: "15" })
       .expect(200)
       .end(function(err,res){
         should.not.exist(err);
         parseInt(res.text).should.equal(55,"Expected value not matching with response");
         done();
       });

 });
});