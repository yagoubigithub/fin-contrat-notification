import React, { Component } from "react";

import { NavLink } from "react-router-dom";

//Mui
import Dialog from '@material-ui/core/Dialog';
import DialogActions  from "@material-ui/core/DialogActions";
import Button  from "@material-ui/core/Button";

// redux
import { connect } from "react-redux";

//icons
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";


class Navbar extends Component {
  state = {
    copyRight : false,
  }
  openCloseCopyRight = () =>{
    this.setState({
      copyRight : !this.state.copyRight
    })
  }
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
              <PersonAddIcon />
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
            to="/user"
            className="nav-link"
          >
            <span className="nav-link-icon">
              <PersonIcon />
            </span>

            <span>Utlisateur</span>
          </NavLink>

      { /*   <p className="copyRight" onClick={this.openCloseCopyRight}>By Atech-info</p>
          <Dialog open={this.state.copyRight} onClose={this.openCloseCopyRight} style={{padding : 15}}>
         
          <img src="/logo250-atech.png" width="300" height="300" />
          <p style={{margin : 5}}>Email : contact@atech-info.com</p>
          <p style={{margin : 5}}>Website : https://atech-info.com/</p>
          

          <DialogActions
          >
            <Button variant="contained" color="primary" onClick={this.openCloseCopyRight}>Cancel</Button>
          </DialogActions>

          </Dialog>
        */ }
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
