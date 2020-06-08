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
import AjouterContart from "./components/ajouter/AjouterContart";
import AjouterEmployee from "./components/ajouter/AjouterEmployee";
import Employee from "./components/Employee";
import Contrat from "./components/Contrat";


class App extends Component {
  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <div className="container">
          {this.props.auth.user !== undefined ? (
            <Navbar />
          ) : (
            <Redirect to="/" />
          )}
          <div className={"content"}>
            <Switch>
              <Route exact path="/" component={Connexion} />
              <Route  path="/ajouter_contrat" component={AjouterContart} />
              <Route  path="/ajouter_employee" component={AjouterEmployee} />
              <Route  path="/employees" component={Employee} />
              <Route  path="/contrats" component={Contrat} />
             
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
