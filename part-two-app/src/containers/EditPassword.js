import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";  //, HelpBlock
import "./EditPassword.css";

export default class EditPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            newPassword: "",
            confirmNewPassword: ""
        };
    }

    validateForm() {
        return (
        this.state.password.length > 0 &&
        this.state.newPassword.length > 0 &&
        this.state.newPassword === this.state.confirmNewPassword
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
            const response = await fetch('http://localhost:4000/users/'+this.props._id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + this.props.token,
                },
                body : JSON.stringify({
                    "password":this.state.newPassword,              
                })
            });
            const body = await response.json();

            if (response.status ===200) {
                this.props.history.push("/getuser");
                alert("Password successfully modified ! \\o/");
            }
            else alert(body.message);

        } catch (error) {
            alert(error.message);
        }
    }



    render() {
        return (
            <div className="EditPassword">
            <form onSubmit={this.handleSubmit}>
            <h1>Edit Password<br/></h1>
                <FormGroup controlId="password" bsSize="large">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                    autoFocus
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                />
                </FormGroup>
                <FormGroup controlId="newPassword" bsSize="large">
                <ControlLabel>New Password</ControlLabel>
                <FormControl
                    value={this.state.newPassword}
                    onChange={this.handleChange}
                    type="password"
                />
                </FormGroup>
                <FormGroup controlId="confirmNewPassword" bsSize="large">
                <ControlLabel>Confirm New Password</ControlLabel>
                <FormControl
                    value={this.state.confirmNewPassword}
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