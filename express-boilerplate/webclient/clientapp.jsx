import React from 'react';
import ReactDOM from 'react-dom';

class MainComponent extends React.Component {
	constructor () {
		super();
	}

	render () {
		return (
			<div>
				<h1>Hello From ReactP7612</h1>	

			</div>
		);
	}
}

ReactDOM.render(
	<MainComponent/>,document.getElementById('mountapp')
);
