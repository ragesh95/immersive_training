import React from 'react';
import ReactDOM from 'react-dom';

var Child1 = require('./components/zomato/restaurants.jsx');
var Favourites = require('./components/zomato/favourites.jsx');
var Menu = require("./components/zomato/menu.jsx");

class MainComponent extends React.Component {
	constructor() {
		super();
		this.state = { menu : ['Home','Favourites','Logout'], active : <Child1 />};
	}

	onMenuChange(x){
		console.log(x);
		if(x === "home"){
			this.setState({
				active : <Child1 />
			});
		}
		else if(x === "favourites") {
			this.setState({
				active : <Favourites />
			});
		}
	}

	render() {
		return (
			<div>
				<Menu menu = {this.state.menu} menuChange = {this.onMenuChange.bind(this)}/>
				{this.state.active}
			</div>
		);
	}
}

ReactDOM.render(
	<MainComponent />,
	document.getElementById('content')
);
