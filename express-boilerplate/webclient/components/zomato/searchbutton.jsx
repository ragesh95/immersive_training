import React from 'react';
import { Button } from 'semantic-ui-react';

class GrandChild extends React.Component {
  constructor() {
    super();
    this.getData = this.getData.bind(this);
    this.getCity = this.getCity.bind(this);
  }

  getCity(){
    $.ajax({

     url:"https://developers.zomato.com/api/v2.1/cities?q="+this.props.city,
     type:'GET',
     beforeSend: function (request)
     {
         request.setRequestHeader("user-key", "fbddf09231cc8477564b717362377898");
     },
    success: function(data)
    {
      console.log('Succesfully city id' + data);
      var locations = data.location_suggestions;
      if(locations.length>=1){
        console.log(locations[0]);
        this.getData(locations[0].id);
      }
      else if(locations.length==0){
        console.log("wrong search");
      }
    }.bind(this),
    error: function(err)
    {
      console.log('error occurred on AJAX');
      console.log(err);
    }.bind(this)
   });
  }

  getData(city){
    $.ajax({

     url:"https://developers.zomato.com/api/v2.1/search?entity_id="+city+"&entity_type=city&q="+this.props.cuisine+"&count=10",
     type:'GET',
     beforeSend: function (request)
     {
         request.setRequestHeader("user-key", "fbddf09231cc8477564b717362377898");
     },
    success: function(data)
    {
      console.log('Successfully got JSON from Zomato' + data);
      this.props.objChange(data.restaurants);
    }.bind(this),
    error: function(err)
    {
      console.log('error occurred on AJAX');
      console.log(err);
    }.bind(this)
   });
  }

  render() {
    return (
      <Button color="teal" onClick={this.getCity}>Search</Button>
    );
  }
}

module.exports = GrandChild;
