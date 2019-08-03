import React, { Component } from 'react';
import {Container, Form, FormGroup, Input, Label, Button} from 'reactstrap';

import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
export class App extends Component {
  state={
    loginusername: '',
    loginpassword:''
  }
  componentDidMount(){
    // fetch('http://localhost:5000/test',{
    //   method: "POST",
    //   headers:{"content-type": "application/json"},
    //   body: JSON.stringify({hello:"world"})
    // }).then (rawJSON =>{
    //   return rawJSON.json();
    // }).then (data =>{
    //    console.log(data);
    // })
  }
login=()=>{
    if (
        !this.state.loginusername ||
        !this.state.loginpassword
      ) {
        alert("Missing form fields");
    }else{
      //make the API call
      fetch("http://localhost:5000/login", {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({
					username: this.state.loginusername,
					password: this.state.loginpassword
				})
			})
				.then(rawJSON => {
					return rawJSON.json();
				})
				.then(data => {
					console.log(data);
				});
		}
	};
  render() {
    return (
    <Container>
      <h3>Log In</h3>
      <Form>
        <FormGroup>
          <Label htmlFor="username">Username:</Label>
          <InputContainer 
            type="text"  className="form-control" id="userName"
            value={this.state.loginusername}
            onChange={evt=>{console.log(evt.target.value);
              //updates data in state
              this.setState({loginusername:evt.target.value});
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password:</Label>
          <InputContainer 
            type="password" className="form-control" id="password"
            value={this.state.loginpassword}
            onChange={evt=>{
              console.log(evt.target.value);
              this.setState({loginpassword: evt.target.value});
            }}
          />
        </FormGroup>
    </Form>
    <Button color="success" onClick={this.login}>
        Login
    </Button>
</Container>
    )
  }
}

export default App
const InputContainer = styled.input`
  padding: 2em; width: 500px; 
  margin: 0.25em;
  color: ${props => props.inputColor || "palevioletred"};
  background: papayawhip;
  border-radius: 3px;
`;
