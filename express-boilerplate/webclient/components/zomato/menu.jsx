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
          <Menu.Item name='home' active={this.state.activeItem === 'home'} onClick={this.handleItemClick}>
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item name='favourites' active={this.state.activeItem === 'favourites'} onClick={this.handleItemClick}>
            <Link to="/favourites">Favourites</Link>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Button color="teal">Sign Up</Button>
            </Menu.Item>
          </Menu.Menu>
      </Menu>
    );
  }
}

module.exports = Menus;
