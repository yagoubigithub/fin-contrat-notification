import React, { Component } from "react";

import { Route } from "react-router-dom";

import { Tab, Tabs } from "react-tabs-css";

import { NavLink } from "react-router-dom";

//mui
import Dialog from '@material-ui/core/Dialog'

//util
import LoadingComponent from "../utils/loadingComponent";

//redux
import {
  getAllEmployee,
  addToCorbeille,
  undoDeleteEmployee,
} from "../store/actions/employeeAction";
import { connect } from "react-redux";

import EmployeeTable from "./tables/EmployeeTable";


class Employee extends Component {
  state = {
    delete_button_text: "Suprimer",
    employees: [],
    employeeCorebeille: [],
    rowsSelected: [],
    tab: "employees",
    addToCorbeilleDialog: false,
  };
  componentDidMount() {
    this.props.getAllEmployee();
  }
  componentWillReceiveProps(nextProps) {
    
    if (nextProps.employees) {
      const employeeCorebeille = [];
      const employees = [];
      let employeesCounter = 1 ;
      let  employeeCorebeilleCounter = 1;
      nextProps.employees.map((employee) => {
        if (employee.status === "undo") {
          employees.push({number : employeesCounter,...employee});
          employeesCounter++;
        }

        if (employee.status === "corbeille") {
          employeeCorebeille.push({number : employeeCorebeilleCounter,...employee});
          employeeCorebeilleCounter++;
        }
      });
     

      this.setState({ employeeCorebeille, employees });
    }
  }


  handleChangeTab = (tab) => {
    switch (tab) {
      case "employees":
        this.setState({
          delete_button_text: "Supprimer",
          rowsSelected: [],
         
          tab: "employees",
        });

        break;

      case "employeeCorebeille":
        this.setState({
          delete_button_text: "Annuler Suppression",
          rowsSelected: [],
          tab: "employeeCorebeille",
        });

        break;

     

      default:
        this.setState({
          delete_button_text: "Supprimer",
          rowsSelected: [],
          tab: "employees",
        });
        break;
    }
  };

  getData = (rowsSelected) => {
    this.setState({ rowsSelected });
  };
  handleOpenCloseaddToCorbeilleDialog = () => {
    this.setState({ addToCorbeilleDialog: !this.state.addToCorbeilleDialog });
  };
  Supprimer = () => {
    if (this.state.rowsSelected.length === 0) {
      alert("Selectionnner des employees");
    } else {
      if (this.state.tab !== "employeeCorebeille") {
        this.handleOpenCloseaddToCorbeilleDialog();
      }
      if (this.state.tab === "employeeCorebeille") {
        this.state.rowsSelected.map((employee) => {
          this.props.undoDeleteEmployee(employee);
        });
        this.setState({ rowsSelected: [] });
      }
    }
  };
  addToCorbeille = () => {
    const rowsSelected = [...this.state.rowsSelected];
    rowsSelected.map((employee) => {
      this.props.addToCorbeille(employee);
    });
    this.setState({ rowsSelected: [] });
  };
  render() {
    return (
      <div>
        <LoadingComponent
          loading={
            this.props.loading !== undefined ? this.props.loading : false
          }
        />
        <div className="sous-nav-container">
          <NavLink onClick={this.props.getAllEmployee} to="/employee">
            <button className="btn btn-nav">Actualisé</button>
          </NavLink>


          <button className="btn btn-nav" onClick={this.Supprimer}>
            {this.state.delete_button_text}
          </button>
        </div>

        <Dialog
          open={this.state.addToCorbeilleDialog}
          onClose={this.handleOpenCloseaddToCorbeilleDialog}
        >
          <h2>Supprimer</h2>
          <button
            onClick={() => {
              this.addToCorbeille();
              this.handleOpenCloseaddToCorbeilleDialog();
            }}
          >
            Supprimer
          </button>
          <button onClick={this.handleOpenCloseaddToCorbeilleDialog}>
            Cancel
          </button>
        </Dialog>
        

     {    <Tabs>
          <Tab
            index={0}
            title="Tous les Employées"
            onClick={() => this.handleChangeTab("employees")}
          >
            <EmployeeTable
              checkBoxColumn
              IconsColumn
              rowsSelected={this.state.rowsSelected}
              sendData={this.getData}
              rows={this.state.employees}
            />
          </Tab>
        

          <Tab
            index={1}
            title="Corbeille"
            onClick={() => this.handleChangeTab("employeeCorebeille")}      
          >
            <EmployeeTable
              checkBoxColumn
              IconsColumn
              rowsSelected={this.state.rowsSelected}
              sendData={this.getData}
              rows={this.state.employeeCorebeille}
              type={"corbeille"}
            />
          </Tab>
        </Tabs> }

       </div>
    );
  }
}
const mapActionToProps = (dispatch) => ({
  getAllEmployee: () => dispatch(getAllEmployee()),
  addToCorbeille: (id) => dispatch(addToCorbeille(id)),
  undoDeleteEmployee: (id) => dispatch(undoDeleteEmployee(id)),
});
const mapStateToProps = (state) => ({
  employees: state.employee.employees,
  loading: state.employee.loading,
});
export default connect(mapStateToProps, mapActionToProps)(Employee);
