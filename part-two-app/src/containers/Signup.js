import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";  //, HelpBlock
import "./Signup.css";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      personalPhone: "",
      password: "",
      confirmPassword: ""
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/users/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body : JSON.stringify({
              "email":this.state.email,
              "password":this.state.password,
              "firstName": this.state.firstName,
              "lastName": this.state.lastName,
              "personalPhone": this.state.personalPhone              
          })
      });
      const body = await response.json();

      if (response.status ===200) {
          this.props.userHasAuthenticated(true);
          this.props.history.push("/getuser");
          console.log('Reponse signup :'+response);
          console.log('Message du body :'+body.message);
          alert("User successfully created ! \\o/");
      }
      else alert(body.message);

  } catch (error) {
      alert(error.message);
  }
}



  render() {
    return (
      <div className="Signup">
      <form onSubmit={this.handleSubmit}>
      <h1>Create User<br/></h1>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="firstName" bsSize="large">
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            type="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="lastName" bsSize="large">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            type="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="personalPhone" bsSize="large">
          <ControlLabel>Personal Phone</ControlLabel>
          <FormControl
            type="personalPhone"
            value={this.state.personalPhone}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>      
        <Button
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
        >
        Submit
        </Button>
        
      </form>
      </div>
    )
  }
}