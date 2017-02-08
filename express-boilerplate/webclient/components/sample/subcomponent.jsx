import React from 'react';
var component1 = require("./child");

class SubComponent extends React.Component {
	constructor () {
		super();
	}

	render () {
		return (
			<div>
        <component1 />
				<component2 />
			</div>
		);
	}
}

module.exports = SubComponent;
