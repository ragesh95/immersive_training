import React from 'react';
import ReactDOM from 'react-dom';

class MainComponent extends React.Component {
 constructor() {
   super();
 }
 render(){
   return (
     <div>
         <h1>React App</h1>
         <h2>Hello from react123</h2>
     </div>
   );
 }
}

ReactDOM.render(<MainComponent />,document.getElementById('content'));
