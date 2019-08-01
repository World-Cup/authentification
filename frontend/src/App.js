import React, { Component } from 'react';
import {Container, Form, FormGroup, Input, Label, Button,Row, Col} from 'reactstrap';
import LogIn from "./LogIn";
import NavBar from './navBar';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
export class App extends Component {
  state={
    username: '',
    password:'',
    confirmPassword:''
  }
  componentDidMount(){
    fetch('http://localhost:5000/test',{
      method: "POST",
      headers:{"content-type": "application/json"},
      body: JSON.stringify({hello:"world"})
    }).then (rawJSON =>{
      return rawJSON.json();
    }).then (data =>{
       console.log(data);
    })
  }

  createAccount=()=>{
    if(this.state.password !== this.state.confirmPassword){
      alert("password does not match")
    }else if (
        !this.state.password ||
        !this.state.username ||
        !this.state.confirmPassword
      ) {
        alert("Missing form fields");
    }else{
      //make the API call
      fetch("http://localhost:5000/createAccount", {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({
					username: this.state.username,
					password: this.state.password
				})
      })
      .then(rawJSON => {
        return rawJSON.json();
      })
      .then(data => {
        //is there is an error state gets set to content of error 
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({ error: null });
        }
        console.log(data);
      });
  }
};
  render() {
    return (
    <Container>
      <Row>
        <Col>
          {this.state.error ? 
            (
              //connected to the backend can't sign in 
              <p style={{ color: "red" }}>{this.state.error}</p>
            ) : null}
          <NavBar/>
          <h3>Create Account</h3>
          <Form>
            <FormGroup>
              <Label htmlFor="username">Username:</Label>
              <InputContainer 
                type="text"  className="form-control" id="userName"
                value={this.state.username}
                onChange={evt=>{console.log(evt.target.value);
                  //updates data in state
                  this.setState({username:evt.target.value});
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password:</Label>
              <InputContainer 
                type="password" className="form-control" id="password"
                value={this.state.password}
                onChange={evt=>{
                  console.log(evt.target.value);
                  this.setState({password:evt.target.value});
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm Password:</Label>
              <InputContainer 
                type="password" className="form-control" id="confirmPassword"
                value={this.state.confirmPassword}
                onChange={evt=>{
                  console.log(evt.target.value);
                  this.setState({confirmPassword:evt.target.value});
                }}
              />
            </FormGroup>
          </Form>
          <Button color="success" onClick={this.createAccount}>
              Create Account
          </Button>
        </Col>
        <Col>
        <LogIn/>
        </Col>
      </Row>
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
