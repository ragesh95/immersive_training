import React from 'react';

var Display = require('./display.jsx');

class Favourites extends React.Component {
  constructor() {
    super();
    this.getFavourites();
    this.state = { obj : [] };
  }

  getFavourites(){
    $.ajax({

     url:"http://localhost:8080/restaurant/getrestaurant",
     type:'GET',
    success: function(data)
    {
      this.setState({ obj : data });
    }.bind(this),
    error: function(err)
    {
      console.log('error occurred on AJAX');
      console.log(err);
    }.bind(this)
   });
  }

  deleteFavourites(id) {
    var obj = [];
    for(var x of this.state.obj) {
      if(id != x.resId){
        obj.push(x);
      }
    }
    this.setState({
      obj : obj
    });
  }

  render() {
    return (
      <Display obj={this.state.obj} fav = "fav" delete = {this.deleteFavourites.bind(this)}/>
    );
  }

}

module.exports = Favourites;
