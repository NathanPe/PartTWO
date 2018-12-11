import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";  //, HelpBlock
import "./EditUser.css";

export default class EditUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
        email: toString(this.props.email),
        firstName: toString(this.props.firstName),
        lastName: toString(this.props.lastName),
        personalPhone: toString(this.props.personalPhone)
        };
    }


    handleChange = event => {
        this.setState({
        [event.target.id]: event.target.value
        });
    }

    handleDelete = async event => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/users/'+this.props._id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + this.props.token,
                },
            });
            const body = await response.json();

            if (response.status ===200) {
                this.props.handleLogout();
                this.props.history.push("/login");
                alert("User successfully deleted ! \\o/");
            }
            else alert(body.message);

        }   catch (error) {
                alert(error.message);
            }
    }

    handleDelete = async event => {
        event.preventDefault();
        this.props.history.push("/editpassword");
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
                alert("User successfully created ! \\o/");
            }
            else alert(body.message);

        } catch (error) {
            alert(error.message);
        }
    }



    render() {
        return (
            <div className="EditUser">
                <form onSubmit={this.handleSubmit}>
                    <h1>Edit User<br/></h1>
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
                    <Button
                    block
                    bsSize="large"
                    type="submit"
                    >
                    Submit
                    </Button>
                </form>
            </div>
            // <div className="EditUser">
            //     <form onSubmit={this.handleDelete}>
            //         <FormGroup>
            //         <Button
            //         block
            //         bsSize="large"
            //         type="submit"
            //         >
            //         Delete User
            //         </Button>
            //         </FormGroup>
            //     </form>
            // </div>
        //     <div className="EditUser">
        //     <form onSubmit={this.handleEditPassword}>
        //         <FormGroup>
        //         <Button
        //         block
        //         bsSize="large"
        //         type="submit"
        //         >
        //         Edit Password
        //         </Button>
        //         </FormGroup>
        //     </form>
        // </div>
        );
    }
}