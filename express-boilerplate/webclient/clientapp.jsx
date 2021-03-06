import React from 'react';
import ReactDOM from 'react-dom';

var {browserHistory, Route, Router, IndexRoute} = require('react-router');
var Child1 = require('./components/zomato/restaurants.jsx');
var Favourites = require('./components/zomato/favourites.jsx');
var Menu = require("./components/zomato/menu.jsx");
var Login = require("./components/login.jsx");
var Invite = require("./components/zomato/invite.jsx");
class MainComponent extends React.Component {
	constructor() {
		super();
		this.state = { menu : ['Home','Favourites','Invite','Logout'], active : <Child1 />};
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
		else if(x === "invite") {
			this.setState({
				active : <Invite />
			});
		}

	}

	render() {
		return (
			<div>
				<Menu menu = {this.state.menu} menuChange = {this.onMenuChange.bind(this)}/>
				{this.props.children}
			</div>
		);
	}
}

ReactDOM.render(
	<Router history={browserHistory}>
                <Route path="/" component={Login}/>
                <Route component={MainComponent}>
									<Route path="/home" component={Child1}/>
                	<Route path="/favourites" component={Favourites}/>
									<Route path="/invite" component={Invite}/>
								</Route>
  </Router>,document.getElementById('menu')
);
