function getCityId(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = this.responseText;
      json = JSON.parse(json);
      var locations = json.location_suggestions;
      if(locations.length==1){
        console.log(locations[0]);
        getData(locations[0].id);
      }
      else if(locations.length==0){
        console.log("wrong search");
      }
    }
  };
  xhttp.open("GET", "https://developers.zomato.com/api/v2.1/cities?q="+$("#citySearch").val()+"&apikey=fbddf09231cc8477564b717362377898", true);
  xhttp.send();
}

function getRestaurants(cityId){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     showRestaurants(this.responseText);
    }
  };
  xhttp.open("GET", "https://developers.zomato.com/api/v2.1/search?entity_id="+cityId+"&entity_type=city&count=10&apikey=fbddf09231cc8477564b717362377898", true);
  xhttp.send();
}

function showRestaurants(json){
  json = JSON.parse(json);
  var restaurants = json.restaurants;
  $("#template").tmpl(restaurants).appendTo("#results");
}
