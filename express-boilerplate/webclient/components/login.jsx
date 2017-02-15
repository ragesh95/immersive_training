var React = require('react');
import { Grid, Image, Container } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';

var {browserHistory} = require('react-router');
var Login = React.createClass({
getInitialState: function()
{
 return {username:'',password:''};
},
handleUserName: function(e)
{
 this.setState({username:e.target.value});
},
handlePassword: function(e)
{
 this.setState({password:e.target.value});
},
LoginUser: function()
{
 $.ajax({
   url:"http://localhost:8080/users/login",
   type: 'POST',
   datatype: 'JSON',
   data:this.state,
   success: function(res)
   {
     console.log(res.responseText);
     browserHistory.push('/home');
   }.bind(this),
   error: function(err)
   {
     alert("Invalid username or password");
     console.log(err.responseText);
   }.bind(this)
 });
}
,
 render: function(){
   return(
   <div className="Login">
        <h2 className="text-center">Login</h2>
        <div className="form-group">
        <input className="form-control" onChange={this.handleUserName}  placeholder="Enter a User Name..."  type="text" />
        </div>
        <div className="form-group">
        <input className="form-control" onChange={this.handlePassword}  placeholder="Enter a Password..."  type="password" />
        </div>
        <input className="btn btn-primary btn-block" onClick={this.LoginUser} type="submit" value="Login" />
   </div>


   );
 }
})

module.exports=Login;
