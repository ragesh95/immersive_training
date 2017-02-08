import React from 'react';
import GrandChild from './grandchild.jsx';
// import GrandChild from './grandchild.jsx'


class Child extends React.Component {
  constructor () {
    super();
  }

  handleChild(){
    this.props.handleClick((a,b)=>{
      return b;
    });
  }

  render () {
    return (
      <div>
        <button onClick={this.handleChild.bind(this)}>Child Button</button>
        <h1>Hello From Child123, {this.props.myPropsDta}, {this.props.name}</h1>
        <GrandChild name=" from Child"/>
      </div>
    );
  }
}

module.exports = {
  Child,
  GrandChild
};
