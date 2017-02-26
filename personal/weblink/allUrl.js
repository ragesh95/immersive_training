var request = require('request');
var cheerio = require('cheerio');
var searchTerm = 'screen+scraping';
var url = 'http://www.salmonsafe.org/blog';
var set = new Set();
var allArr = [];
var b = require('openurl');
b.open("google.com");

function readAllUrl() {
  request(url, function(err, resp, body){
  $ = cheerio.load(body);
  links = $('a');
  $(links).each(function(i, link){
    var temp = $(link).attr('href');
    if(temp.startsWith('/')) {
      set.add("http://salmonsafe.org/"+temp);
    }
  });
  console.log(set);
  });
}
