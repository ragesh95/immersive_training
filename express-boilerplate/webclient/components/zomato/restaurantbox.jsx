import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';

class RestaurantBox extends React.Component {

  constructor() {
    super();
    this.state = {favourite : "thumbs outline up", comment : "", updateBox : ""};
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

  updateComment(e) {
    console.log("comesto update");
    $.ajax({
     url:"http://localhost:8080/restaurant/updaterestaurant",
     type:'PUT',
     data : {"resId":this.props.id, "resComments":e.target.value},
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
          this.setState({
            comment : data.resComments
          });
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

  componentDidMount() {
    this.getRestaurant();
  }

  addRestaurant() {
    $.ajax({

     url:"http://localhost:8080/restaurant/addrestaurant",
     type:'POST',
     data: {"resId":this.props.id, "resName":this.props.name, "resDescription":this.props.description, "resReview":this.props.rating, "resReviewCount":this.props.ratingCounts, "resImage":this.props.image, "resUrl":this.props.cuisine, "resComments":""},
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

  updateBox(e) {
    this.setState({
      updateBox : e.target.value
    });
  }

  render() {
    var update = "";
    if(this.props.fav === "fav") {
      update = (
        <div>
          <Input action='Update' placeholder={this.state.comment} className='update' onChange={this.updateComment.bind(this)}/>
        </div>
      );
    }
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
