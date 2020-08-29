import React, { Component } from "react";



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
  readFile,
  removeMyFile,
  _export
} from "../store/actions/employeeAction";
import { connect } from "react-redux";

import EmployeeTable from "./tables/EmployeeTable";


import Import from "./Import";



class Employee extends Component {
  state = {
    delete_button_text: "Supprimer",
    employees: [],
    employeeCorebeille: [],
    employeeContratEpiration :[],
    rowsSelected: [],
    tab: "employees",
    addToCorbeilleDialog: false,
    importDialog : false,
    myFile : []
  };
  componentDidMount() {
    this.props.getAllEmployee();
  }
  componentWillReceiveProps(nextProps) {
    
    if (nextProps.employees) {
      const employeeCorebeille = [];
      const employees = [];

     const  employeeContratEpiration = [];

      let employeesCounter = 1 ;
      let  employeeCorebeilleCounter = 1;
      let  employeeContratEpirationCounter = 1;
      nextProps.employees.map((employee) => {
        if (employee.status === "undo") {
          employees.push({number : employeesCounter,...employee});
          employeesCounter++;
        }

        if (employee.status === "corbeille") {
          employeeCorebeille.push({number : employeeCorebeilleCounter,...employee});
          employeeCorebeilleCounter++;
        }
        if((new Date().getTime() > new Date(employee.date_fin).getTime()) && employee.status === "undo"){
          employeeContratEpiration.push({number : employeeContratEpirationCounter,...employee});
          employeeContratEpirationCounter++;

        }
      });
     

      this.setState({ employeeCorebeille, employees , employeeContratEpiration });
    }

    if(nextProps.myFile){
      this.setState({myFile : nextProps.myFile})
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
          setTimeout(this.props.undoDeleteEmployee(employee),100)
          
        });
        this.setState({ rowsSelected: [] });
      }
    }
  };
  addToCorbeille = () => {
    const rowsSelected = [...this.state.rowsSelected];
    rowsSelected.map((employee) => {
      setTimeout(this.props.addToCorbeille(employee),100);
    });
    this.setState({ rowsSelected: [] });
  };


  _export = () => {

    this.props._export();
  }

  import = () =>{
    const fileInput = document.getElementById("file");
    fileInput.click();

  }

  handleFileInputChange=(e)=>{
  //  this.handleOpenCloseImportDialog()
    const file  = e.target.files[0];
    const path  = file.path;
    e.target.value = ""
    this.props.readFile(path);
   
  }
  handleOpenCloseImportDialog = () =>{

   this.setState({
     importDialog  : ! this.state.importDialog
   }, ()=>{
    if( !this.state.importDialog ){
      this.props.removeMyFile()

    }
  })
  


  }
  render() {
    return (
      <div>
        <LoadingComponent
          loading={
            this.props.loading !== undefined ? this.props.loading : false
          }
        />
        <div className="sous-nav-container">
        <h1 style={{color: "white", marginRight : 50}}>Employé</h1>
          <NavLink onClick={this.props.getAllEmployee} to="/employees">
            <button className="btn btn-nav">Actualisé</button>
          </NavLink>


          <button className="btn btn-nav" onClick={this.Supprimer}>
            {this.state.delete_button_text}
          </button>

          <button className="btn btn-nav" onClick={this._export}>Exporter</button>

          <button className="btn btn-nav" onClick={this.import}>Importer</button>
          <input type="file" id="file" accept=".csv" id="file" hidden onChange={this.handleFileInputChange} />
        </div>

        <Dialog  open={this.state.importDialog}
          onClose={this.handleOpenCloseImportDialog}
          
         maxWidth="xl"
         fullWidth={true}
          
         >
         <div >
                <LoadingComponent
          loading={
            this.props.loading !== undefined ? this.props.loading : false
          }
        />
        
        <Import myFile={this.state.myFile} />
         </div>
      

        </Dialog>

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
        

     {    <Tabs style={{height : 700}}>
          <Tab
            index={0}
            group="employee"
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
            group="employee"
            title="Contrats terminés"
            onClick={() => this.handleChangeTab("employeeContratEpiration")}      
          >
            <EmployeeTable
              checkBoxColumn
              IconsColumn
              rowsSelected={this.state.rowsSelected}
              sendData={this.getData}
              rows={this.state.employeeContratEpiration}
             
            />
          </Tab>

          <Tab
            index={2}
            group="employee"
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
  readFile :  (path)=>dispatch(readFile(path)),
  removeMyFile : () =>dispatch(removeMyFile()),
  _export :  ()=>dispatch(_export())
});
const mapStateToProps = (state) => ({
  employees: state.employee.employees,
  loading: state.employee.loading,
  myFile :  state.employee.myFile
});
export default connect(mapStateToProps, mapActionToProps)(Employee);
