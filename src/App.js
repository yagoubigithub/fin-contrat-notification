import React, { Component } from "react";
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


class App extends Component {
  render() {
    return (
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
             
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(App);
