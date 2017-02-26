let neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://192.168.1.19", neo4j.auth.basic("neo4j", "9455338161"));
var session = driver.session();
console.log("Connected...");
var query = 'match (n:User)-[x:follow]->(m:User) where n.name="Ragesh" return x;';
var suggestion = "big";
session.run(query).then(function(result){
	let x = (result.records[0]._fields[0].properties.on);
	// var i = new integer(x);
	console.log(x);
	// for(var x of result.records){
	// 	var question = x._fields[0].properties.Content;
	// 	if(question.includes(suggestion))
	// 		console.log(question);
	// }
  	session.close();
  	driver.close();
});
