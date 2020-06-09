import React, { Component } from "react";

import { NavLink } from "react-router-dom";

// redux
import { connect } from "react-redux";

//icons
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssessmentIcon from "@material-ui/icons/Assessment";
import DomainIcon from "@material-ui/icons/Domain";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import DescriptionIcon from "@material-ui/icons/Description";
import WorkIcon from "@material-ui/icons/Work";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";

class Navbar extends Component {
  render() {
    return (
      <nav className="nav">
        <div className="navbar">
          <h2 className="project-title">
            {this.props.auth.user.employe && this.props.auth.user.employe}
          </h2>

          <NavLink
            activeClassName="nav-active"
            to="/ajouter_employee"
            className="nav-link"
          >
            <span className="nav-link-icon">
              <AssignmentIndIcon />
            </span>

            <span>Ajouter Employé</span>
          </NavLink>
          <NavLink
            activeClassName="nav-active"
            to="/employees"
            className="nav-link"
          >
            <span className="nav-link-icon">
              <FormatListNumberedIcon />
            </span>

            <span>Liste des Employées</span>
          </NavLink>

          <NavLink
            activeClassName="nav-active"
            to="/alarme"
            className="nav-link"
          >
            <span className="nav-link-icon">
              <FormatListNumberedIcon />
            </span>

            <span>Alarme</span>
          </NavLink>
         
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(Navbar);
