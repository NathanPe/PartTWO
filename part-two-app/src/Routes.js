import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import GetUser from "./containers/GetUser";
import NotFound from "./containers/NotFound";
import EditUser from "./containers/EditUser";
import EditPassword from "./containers/EditPassword";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Login} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/getuser" exact component={GetUser} props={childProps} />
    <AppliedRoute path="/edituser" exact component={EditUser} props={childProps} />
    <AppliedRoute path="/editpassword" exact component={EditPassword} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;