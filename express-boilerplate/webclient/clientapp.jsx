import React from 'react';
import ReactDOM from 'react-dom';

var Child = require("./components/sample/index.jsx");

function formatName(user, img) {
	if(user) {
		return user.firstName+" "+user.lastName;
	}
	return "user";
}

function setWelcomeImage(img) {
	if(img)
		return img;
}

function getDate(){
	const date = (<h1>{new Date().toLocaleTimeString()}</h1>);
	ReactDOM.render(
	  date,
	  document.getElementById('dateapp')
	);
}

const user = {
	firstName : "Rageshwaran",
	lastName : "R"
};

const welcomeUser = (<div><img src={setWelcomeImage("http://www.w3schools.com/css/trolltunga.jpg")}/><h1 className="greetings">Welcome {formatName(user)} </h1></div>);

function WelcomeReact(props){
	return (
		<h1>Welcome {props.name}</h1>
	);
}

class MainComponent extends React.Component {

	constructor () {
		super();
		this.state = {name : "hai", city : ""};
		this.handleClick = this.handleClick.bind(this);
		this.change = this.change.bind(this);
	}

	change(e){
		this.setState({city : e.target.value});
	}

	handleClick(){
		if(this.state.name === "hai"){
			this.setState({name : "hello"});
		}
		else{
			this.setState({name : "hai"});
		}
	}

	handleClick(city){
			this.setState({name : city});
	}

	render () {
		return (
			<div>
				<input type="text" onChange={this.change}/>
				<button onClick={this.handleClick}>Make fun</button>
				<WelcomeReact name="raki"/>
				<WelcomeReact name="Sounderr"/>
				<h1>Hello From React,{this.props.name}</h1>
				<Child.Child.Child myPropsDta={this.state.name} handleClick = {this.handleClick.bind(this, this.state.city)}/>
				<Child.Child.GrandChild />
			</div>
		);
	}
}

ReactDOM.render(
	<MainComponent name="Rak"/>,document.getElementById('mountapp')
);
ReactDOM.render(
	<Child.Child.GrandChild/>,document.getElementById('childapp')
);
ReactDOM.render(
  welcomeUser,
  document.getElementById('root')
);
ReactDOM.render(
  welcomeUser,
  document.getElementById('check')
);

setInterval(getDate, 1000);
