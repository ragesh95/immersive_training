import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';

class RestaurantBox extends React.Component {

  constructor() {
    super();
    this.state = {favourite : "thumbs outline up"};
  }

  changeState(){
    this.setState(
      {resId:this.props.id, resName:this.props.name, resDescription:this.props.description, resReview:this.props.rating, resReviewCount:this.props.ratingCounts, resImage:this.props.image, favourite : "thumbs outline up"}
    );
  }

  changeFavourite() {
    if(this.state.favourite === "thumbs outline up"){
      this.setState({favourite : "thumbs up"});
      this.addRestaurant();
    }
    else {
      this.setState({favourite : "thumbs outline up"});
      this.deleteRestaurant();
    }
    console.log(this.state.id);
  }

  deleteRestaurant() {
    this.props.delete(this.props.id);
    $.ajax({

     url:"http://localhost:8080/restaurant/deleterestaurant",
     type:'DELETE',
     data: {"resId":this.props.id},
    success: function(datas)
    {
      console.log(datas);
    }.bind(this),
    error: function(err)
    {
      console.log('error occurred on AJAX');
      console.log(err);
    }.bind(this)
   });
  }

  changeFav() {
    this.setState({favourite : "thumbs up"});
  }

  getRestaurant() {
    var id = this.props.id;
    var changeFavourite = this.changeFav.bind(this);
    console.log(id);
    $.ajax({
     url:"http://localhost:8080/restaurant/getrestaurant",
     type:'GET',
    success: function(datas)
    {
      console.log(datas);
      for(var data of datas) {
        console.log(typeof data.resId);
        if(data.resId == id){
          console.log("comes");
          changeFavourite(1);
        }
      }
    }.bind(this),
    error: function(err)
    {
      console.log('error occurred on AJAX');
      console.log(err);
    }.bind(this)
   });
  }

  addRestaurant() {
    $.ajax({

     url:"http://localhost:8080/restaurant/addrestaurant",
     type:'POST',
     data: {"resId":this.props.id, "resName":this.props.name, "resDescription":this.props.description, "resReview":this.props.rating, "resReviewCount":this.props.ratingCounts, "resImage":this.props.image, "resUrl":this.props.cuisine, "resComments":"Comments..."},
    success: function(datas)
    {
      console.log(datas);
    }.bind(this),
    error: function(err)
    {
      console.log('error occurred on AJAX');
      console.log(err);
    }.bind(this)
   });
  }

  render() {
    const update = (
      <div>
        <Input action='Comment...' placeholder='Search...' />
      </div>
    );
    const extra = (
      <div>
        <span className="left">
          <Icon name='user' />
          {this.props.rating}/{this.props.ratingCounts}
        </span>
        <span className="right">
          <Icon name={this.state.favourite} onClick={this.changeFavourite.bind(this)}/>
        </span>
        {update}
      </div>
    );
    return (
      <Card onMouseOver={this.getRestaurant.bind(this)}>
        <Image src={this.props.image} className="image"/>
        <Card.Content>
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Meta className="meta">{this.props.cuisine}</Card.Meta>
          <Card.Description className="description">{this.props.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          {extra}
        </Card.Content>
    </Card>
    );
  }
}

module.exports = RestaurantBox;
