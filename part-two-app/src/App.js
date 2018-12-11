import React, { Component } from 'react';
// import { Link } from "react-router-dom";
// import { LinkContainer } from "react-router-bootstrap";
import './App.css';
import Routes from "./Routes";

class App extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false,
      token: null,
      email: null,
      firstName: null,
      lastName: null,
      personalPhone: null,
      _id: null,

    };
  }
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  putToken = token => {
    this.setState({ token: token });
  }
  putEmail = email => {
    this.setState({ email: email });
  }
  putFirstName = firstName => {
    this.setState({ firstName: firstName });
  }
  putLastName = lastName => {
    this.setState({ lastName: lastName });
  }
  putPersonalPhone = personalPhone => {
    this.setState({ personalPhone: personalPhone });
  }
  putId = ID => {
    this.setState({ _id: ID });
  }

  handleLogout = event => {
    window.location.href = '/';
    this.userHasAuthenticated(false);
    this.putToken(null);
    this.putEmail(null);
    this.putFirstName(null);
    this.putLastName(null);
    this.putPersonalPhone(null);
    this.putId(null);
  }

  render() {
    // console.log('état de isAuthenticated '+ this.isAuthenticated);
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      Token: this.state.Token,
      userHasAuthenticated: this.userHasAuthenticated,
      handleLogout: this.handleLogout,
      putToken: this.putToken,
      putEmail: this.putEmail,
      putFirstName: this.putFirstName,
      putLastName: this.putLastName,
      putPersonalPhone: this.putPersonalPhone,
      putId: this.putId,
    };
    return (
      <div className="App container">
      
      <Routes childProps={childProps} />

    </div>
    );
  }
}

export default App;