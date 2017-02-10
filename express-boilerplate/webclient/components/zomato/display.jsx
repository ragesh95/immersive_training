import React from 'react';
import { Grid, Image, Container } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';

var Restaurant = require('./restaurantbox');

class GrandChild2 extends React.Component {
  constructor() {
    super();
  }
  render() {
    var columns=[];
    var resturants = "";
    var fav = this.props.fav;
    var delete1 = this.props.delete;
    console.log("outside"+this.props.obj);
    if(typeof this.props.obj === "object"){
      console.log("inside");
      resturants= this.props.obj.map(function(obj){
        if(fav === "fav") {
          return (
            <Grid.Column centered>
              <Restaurant id={obj.resId} image={obj.resImage} name={obj.resName} cuisine={obj.resUrl} description={obj.resDescription} rating={obj.resReview} ratingCounts={obj.resReviewCount} delete = {delete1} fav = "fav"/>
            </Grid.Column>
          );
        }
        return (
          <Grid.Column centered>
            <Restaurant id={obj.restaurant.id} image={obj.restaurant.featured_image} name={obj.restaurant.name} cuisine={obj.restaurant.cuisines} description={obj.restaurant.location.address} rating={obj.restaurant.user_rating.aggregate_rating} ratingCounts={obj.restaurant.user_rating.votes}/>
          </Grid.Column>
        );
      });
    }
    return (
      <Container className="search">
        <Grid centered columns={3}>
        {resturants}
        </Grid>
      </Container>
    );
  }
}

module.exports = GrandChild2;
