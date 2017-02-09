import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';

var GrandChild = require('./searchbutton.jsx');
var Display = require('./display.jsx');

class Child extends React.Component {
  constructor() {
    super();
    this.state = {city : "", cuisine: "", obj: []};
    this.cityChange = this.cityChange.bind(this);
    this.cuisineChange = this.cuisineChange.bind(this);
  }

  cityChange(e) {
    this.setState({
      city : e.target.value
    });
  }

  cuisineChange(e) {
    this.setState({
      cuisine : e.target.value
    });
  }

  objChange(obj){
    this.setState({
      obj: obj
    });
    console.log("changed"+typeof obj);
  }

  render() {
    return (
      <div>
        <Grid centered columns={1}>
          <Grid centered columns={1} className="search">
              <Input placeholder='City...' onChange={this.cityChange}/>
              <Input placeholder='Cuisine...' onChange={this.cuisineChange}/>
              <GrandChild city={this.state.city} cuisine={this.state.cuisine} objChange={this.objChange.bind(this)}/>
          </Grid>
        </Grid>
        <Display obj={this.state.obj}/>
      </div>
    );
  }

}

module.exports = Child;
