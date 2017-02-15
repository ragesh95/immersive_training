import React from 'react';
var {Link} = require('react-router');
import { Menu } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';

class Menus extends React.Component {
  constructor() {
    super();
    this.state = {  }
  }

  handleItemClick = (e, { name }) => {
    // this.props.menuChange(name);
    this.setState({ activeItem: name });
  };

  logOut() {
    $.ajax({

     url:"http://localhost:8080/users/logout",
     type:'GET',
    success: function(data)
    {
      if(typeof data.redirect == 'string') {
        window.location.replace(window.location.protocol + "//" +window.location.host + data.redirect);
      }
      console.log("successfully logged out");
    }.bind(this),
    error: function(err)
    {
      console.log('error occurred on AJAX');
      console.log(err);
    }.bind(this)
   });
  }

  render() {
    var items = [];
    this.props.menu.map(function(item){
      items.push({key : item, name: item});
    });
    return (
      // <Menu items={items} onClick={this.menuChange.bind(this)}/>
      // <Menu size='huge'>
      //   <Menu.Item name='home' active={this.state.activeItem === 'home'} onClick={this.handleItemClick} />
      //   <Menu.Item name='favourites' active={this.state.activeItem === 'favourites'} onClick={this.handleItemClick} />
      //
      //   <Menu.Menu position='right'>
      //     <Menu.Item>
      //       <Button color="teal">Sign Up</Button>
      //     </Menu.Item>
      //   </Menu.Menu>
      // </Menu>
      <Menu size='huge'>
        <Link to="/home">
          <Menu.Item name='home' active={this.state.activeItem === 'home'} onClick={this.handleItemClick}>
          </Menu.Item>
        </Link>
        <Link to="/favourites">
          <Menu.Item name='favourites' active={this.state.activeItem === 'favourites'} onClick={this.handleItemClick}>

          </Menu.Item>
        </Link>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Button color="teal" onClick={this.logOut.bind(this)}>Sign Out</Button>
            </Menu.Item>
          </Menu.Menu>
      </Menu>
    );
  }
}

module.exports = Menus;
