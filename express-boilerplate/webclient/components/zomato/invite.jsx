import React from 'react';
import { Input } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
class invite extends React.Component {
  constructor() {
    super();
    this.state = {
      "mail" : "",
      "status" : "",
      "button" : "Invite",
      "value" : ""
    };
    this.invite = this.invite.bind(this);
  }

  change(e) {
    this.setState({
      value : e.target.value
    });
  }

  invite(){
    $.ajax({

     url:"http://localhost:8080/users/send",
     type:'POST',
     data:{"mail":this.state.value},
    success: function(data)
    {
      this.setState({
        "status" : "Invited",
        "button" : "Invite More?",
        "value":""
      });
      console.log("success");
      // this.setState({ obj : data });
    }.bind(this),
    error: function(err)
    {
      console.log('error occurred on Send AJAX');
      console.log(err);
    }.bind(this)
   });
  }
  render() {
    return(
      <div>
      <h1>
        Invite
      </h1>

      <Input placeholder='Email..' onChange = {this.change.bind(this)} value={this.state.value} autoFocus/>
      <Button color="white" onClick={this.invite}>{this.state.button}</Button>
      {this.state.status}
    </div>
    );
  }
}

module.exports = invite;
