import React, { Component } from "react";

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Connexion from "./components/auth/Connexion";

//redux
import { connect } from "react-redux";

import "./App.css";

import AjouterEmployee from "./components/ajouter/AjouterEmployee";
import Employee from "./components/Employee";

import Alarme from "./components/Alarme";
import TaskBar from "./components/TaskBar";
import User from "./components/User";



class App extends Component {
  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      
      <Router>
      <TaskBar></TaskBar>
        <div className="container">
          {this.props.auth.user !== undefined ? (
            <Navbar />
          ) : (
            <Redirect to="/" />
          )}
          <div className={"content"}>
            <Switch>
              <Route exact path="/" component={Connexion} />
             
              <Route  path="/ajouter_employee" component={AjouterEmployee} />
              <Route  path="/employees" component={Employee} />

              <Route  path="/alarme" component={Alarme
              } />
              
              <Route  path="/user" component={User
              } />
              
             
            </Switch>
          </div>
        </div>
      </Router>
      </MuiPickersUtilsProvider>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(App);
