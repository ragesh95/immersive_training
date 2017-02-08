import React from 'react';

class GrandChild extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div>
        <h1>Hello From Grand Child {this.props.name}</h1>

      </div>
    );
  }
}

module.exports = GrandChild;
