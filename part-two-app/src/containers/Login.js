import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
        email: "",
        password: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleSignUp = async event => {
        event.preventDefault();
        this.props.history.push("/signup");
    }


    handleChange = event => {
        this.setState({
        [event.target.id]: event.target.value
        });
    }

    
    
    handleSubmit = async event => {
        event.preventDefault();

        try {
            let response = await fetch('http://localhost:4000/users/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({
                    "email":this.state.email,
                    "password":this.state.password
                })
            });
            // console.dir('tostring response: '+ toString(response));
            // console.dir('response status: '+response.status);
            // console.dir('response: '+ response);
            // console.dir('Object.values(response): '+ Object.values(response));
            // console.dir('response.body: '+ response.body);
            // console.dir('JSON.stringify(response): '+ JSON.stringify(response));
            // console.dir('JSON.stringify(response.body): '+ JSON.stringify(response.body));
            // console.dir('Object.values(response.body): '+ Object.values(response.body));
            // console.dir('response.body.body: '+ response.body.body);
            
            // console.dir('JSON.parse(response.body): '+ JSON.parse(response.body)._id);
            // const body = await response.json();


        if (response.status ===200) {
            console.log('response: '+response);
            // this.props.putToken(body.token);
            // console.log('Token: '+this.props.token);
            // this.props.putEmail(body.email);
            // console.log('Email: '+this.props.email);
            // this.props.putFirstName(body.firstName);
            // console.log('FirstName: '+this.props.firstName);
            // this.props.putLastName(body.lastName);
            // console.log('LastName: '+this.props.lastName);
            // this.props.putPersonalPhone(body.personalPhone);
            // console.log('Personal Phone: '+this.props.personalPhone);
            // this.props.putId(body._id);
            // console.log('id: '+this.props._id);

            this.props.userHasAuthenticated(true);
            this.props.history.push("/getUser");
            alert("logged in");
        }
        else {
            console.log('response.status: '+response.status);
            const body = response.json();
            alert(body.message);
        }

        } catch (error) {
            alert(error.message);
        }
    }

    render() {
        return (
        <div className="Login">
            <form onSubmit={this.handleSubmit}>
            <h1>Login<br/></h1>
            <FormGroup controlId="email" bsSize="large">
                <ControlLabel>Email</ControlLabel>
                <FormControl
                autoFocus
                type="email"
                value={this.state.email}
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
            <Button
                block
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
            >
                Login
            </Button>
            
            </form>
            <form onSubmit={this.handleSignUp}>
                <FormGroup>
                <Button
                    block
                    bsSize="large"
                    type="submit"
                >
                    Sign Up
                </Button>
                </FormGroup>
            </form>
        </div>
        );
    }
}