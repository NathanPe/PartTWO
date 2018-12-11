import React, { Component } from "react";
import { Button, FormGroup } from "react-bootstrap";
import "./GetUser.css";

export default class GetUser extends Component {    

  handleChange = async event => {
    this.setState({
        [event.target.id]: event.target.value
    });
  }

  handleEditUser = async event => {
    event.preventDefault();
    this.props.history.push("/edituser");
  }

  handleEditPassword = async event => {
    event.preventDefault();
    this.props.history.push("/editpassword");
  }

  handleLogout = async event => {
    event.preventDefault();
    this.props.handleLogout();
  }

//   async componentDidMount() {
//     try {
//         console.log('début du try de GetUser');
//         // const response = await fetch('http://localhost:4000/users/current', {
//         //     method: 'GET',
//         //     headers: {
//         //         'Content-Type': 'application/json',
//         //         "Authorization": "Bearer " + this.props.token}
//         // })
//         // console.log(response);
//         // var body = await response.json();
//         // console.log('body: '+body);
//         // this.fetch.
//         // this.email = body.email;
//         // this.firstName = body.firstName;
//         // this.lastName = body.lastName;
//         // this.personalPhone = body.personalPhone;
//         // this.email.handleChange();

//         fetch('http://localhost:4000/users/current', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     "Authorization": "Bearer " + this.props.token}
//             }).then(this.refreshUser)    
//     }
//     catch (error) {
//         alert(error.message);
//         this.props.handleLogout();
//     }
//   }

  
  render() {

    return (
    
    <div className="GetUser">
        <form onSubmit={this.handleEditUser}>
        <h1>Get User<br/></h1>
        
        <p>Email: {this.props.email}</p>
        <p>First Name: {this.props.firstName}</p>
        <p>Last Name: {this.props.lastName}</p>
        <p>Personal Phone: {this.props.personalPhone}</p>
        
        <Button
            block
            bsSize="large"
            type="submit"
        >
            Edit User
        </Button>
        
        </form>
        <form onSubmit={this.handleEditPassword}>
            <FormGroup>
            <Button
                block
                bsSize="large"
                type="submit"
            >
                Edit Password
            </Button>
            </FormGroup>
        </form>
        <form onSubmit={this.handleLogout}>
            <FormGroup>
            <Button
                block
                bsSize="large"
                type="submit"
            >
                Logout
            </Button>
            </FormGroup>
        </form>
    </div>
    );
    
  }
}