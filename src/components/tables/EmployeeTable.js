import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";

//Mui
import IconButton from "@material-ui/core/IconButton";

import {
  Dialog,
  Collapse,
  Grid,
  DialogContent,
  Checkbox,
  Paper,
  DialogActions,
  Button,
} from "@material-ui/core";

//redux
import { connect } from "react-redux";
import {
  addToCorbeille,
  getEmployee,
 
  undoDeleteEmployee,
} from "../../store/actions/employeeAction";

//icons

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PermMediaIcon from "@material-ui/icons/PermMedia";
import UndoIcon from "@material-ui/icons/Undo";
import SearchIcon from "@material-ui/icons/Search";

import LoadingComponent from "../../utils/loadingComponent";
import AjouterEmployee from "../ajouter/AjouterEmployee";
import ModifierEmployee from "../modfier/ModifierEmployee";

class EmployeeTable extends Component {
  state = {
    
    addToCorbeilleDialog: false,
    deletedId: null,
    rowsSelected: this.props.rowsSelected,
    selectedAll: false,

    maitreDouvrageSelected: {},
    selectedAll: false,
    employee : null,
    modifierDialog : false,
    
  };
  componentWillReceiveProps(nextProps) {
  
    if (nextProps.rowsSelected) {
      this.setState({ rowsSelected: nextProps.rowsSelected });
    }
    if (nextProps.rows.length !== this.props.rows.length) {
      this.setState({ selectedAll: false });
    }
  }

  componentWillUnmount() {
    switch (this.props.type) {
      case "choose-one":
        const maitreDouvrageSelected = { ...this.state.maitreDouvrageSelected };
        this.props.sendData(maitreDouvrageSelected);
        break;
      default:
        break;
    }
  }


  modifier = (employee) =>{
    this.setState({ employee});
    //popup
    this.handleOpenCloseModifierDialog();
  }

  handleOpenCloseModifierDialog = () =>{
    this.setState({ modifierDialog: !this.state.modifierDialog });
  }
  handleOpenCloseaddToCorbeilleDialog = () => {
    this.setState({ addToCorbeilleDialog: !this.state.addToCorbeilleDialog });
  };
  add_To_Corbeille = (id) => {
    this.setState({ deletedId: id });
    //popup
    this.handleOpenCloseaddToCorbeilleDialog();
  };
  handeleCheckCheckboxRow = (e, id) => {
    const rowsSelected = [...this.state.rowsSelected];
    if (this.checkRowIsSelected(id)) {
      //unselect
      rowsSelected.splice(
        rowsSelected.findIndex((item) => id == item),
        1
      );
    } else {
      //select
      rowsSelected.push(id);
    }

    if (rowsSelected.length === 0) this.setState({ selectedAll: false });
    this.setState({ rowsSelected }, () => {
      this.props.sendData(rowsSelected);
    });
  };
  checkRowIsSelected = (id) => {
    const rowsSelected = [...this.state.rowsSelected];
    return rowsSelected.filter((row) => row == Number.parseInt(id)).length > 0;
  };

  handleSelectAllChange = () => {
    let selectedAll = this.state.selectedAll ? false : true;
    const rowsSelected = [];
    if (selectedAll) {
      this.props.rows.map((item) => {
        rowsSelected.push(item.id);
      });
    }
    this.setState({ selectedAll, rowsSelected }, () => {
      this.props.sendData(rowsSelected);
    });
  };

  

  handleSelectOneChange = (maitreDouvrageSelected) => {
    this.setState({
      maitreDouvrageSelected,
    });
  };
  getData = (data)=>{
    if(data.employeeEdited){
      this.handleOpenCloseModifierDialog()
    }
  }
  render() {
    const columns = [
      {
        Header: "Nom",
        accessor: "nom",
        filterMethod: (filter, row) => {
          const regx = `.*${filter.value}.*`;
          return row[filter.id].match(regx);
        },

        Cell: (props) => (
          <div className="cell">
            {props.value !== "undefined" ? props.value : ""}
          </div>
        ),
        Filter: ({ filter, onChange }) => (
          <div className="searchtable-container">
            <label htmlFor="date-input-nom">
              <SearchIcon className="searchtable-icon" />
            </label>

            <input
              type="text"
              id="date-input-nom"
              className="searchtable-input"
              onChange={(event) => onChange(event.target.value)}
              value={filter ? filter.value : ""}
            />
          </div>
        ),
      },
      {
        Header: "Prénom",
        accessor: "prenom",
        filterMethod: (filter, row) => {
          const regx = `.*${filter.value}.*`;
          return row[filter.id].match(regx);
        },
        Cell: (props) => (
          <div className="cell">
            {props.value !== "undefined" ? props.value : ""}
          </div>
        ),
        Filter: ({ filter, onChange }) => (
          <div className="searchtable-container">
            <label htmlFor="date-input-prenom">
              <SearchIcon className="searchtable-icon" />
            </label>

            <input
              type="text"
              id="date-input-prenom"
              className="searchtable-input"
              onChange={(event) => onChange(event.target.value)}
              value={filter ? filter.value : ""}
            />
          </div>
        ),
      },
      {
        Header: "Adresse",
        accessor: "adresse",
        filterMethod: (filter, row) => {
          const regx = `.*${filter.value}.*`;
          return row[filter.id].match(regx);
        },
        Cell: (props) => (
          <div className="cell">
            {props.value !== "undefined" ? props.value : ""}
          </div>
        ),
        Filter: ({ filter, onChange }) => (
          <div className="searchtable-container">
            <label htmlFor="date-input-adresse">
              <SearchIcon className="searchtable-icon" />
            </label>

            <input
              type="text"
              id="date-input-adresse"
              className="searchtable-input"
              onChange={(event) => onChange(event.target.value)}
              value={filter ? filter.value : ""}
            />
          </div>
        ),
      },
      {
        Header: "Télephone",
        accessor: "telephone",
        filterMethod: (filter, row) => {
          const regx = `.*${filter.value}.*`;
          return row[filter.id].match(regx);
        },
        Cell: (props) => (
          <div className="cell">
            {props.value !== "undefined" ? props.value : ""}
          </div>
        ),
        Filter: ({ filter, onChange }) => (
          <div className="searchtable-container">
            <label htmlFor="date-input-telephone">
              <SearchIcon className="searchtable-icon" />
            </label>

            <input
              type="text"
              id="date-input-telephone"
              className="searchtable-input"
              onChange={(event) => onChange(event.target.value)}
              value={filter ? filter.value : ""}
            />
          </div>
        ),
      },
   
      {
        Header: "Email",
        accessor: "email",
        filterMethod: (filter, row) => {
          const regx = `.*${filter.value}.*`;
          return row[filter.id].match(regx);
        },

        Cell: (props) => (
          <div className="cell">
            {props.value !== "undefined" ? props.value : ""}
          </div>
        ),
        Filter: ({ filter, onChange }) => (
          <div className="searchtable-container">
            <label htmlFor="date-input-email">
              <SearchIcon className="searchtable-icon" />
            </label>

            <input
              type="text"
              id="date-input-email"
              className="searchtable-input"
              onChange={(event) => onChange(event.target.value)}
              value={filter ? filter.value : ""}
            />
          </div>
        ),
      },
      {
        Header: "Date du fin du contrat",
        accessor: "date_fin",
        width: 250,
        Cell: (props) => (
          <div className="cell">
            {props.value !== "undefined" ? props.value : ""}
          </div>
        ),
        Filter: ({ filter, onChange }) => (
          <div className="searchtable-container">
            <label htmlFor="date-input-date_fin">
              <SearchIcon className="searchtable-icon" />
            </label>

            <input
              type="text"
              id="date-input-date_fin"
              className="searchtable-input"
              onChange={(event) => onChange(event.target.value)}
              value={filter ? filter.value : ""}
            />
          </div>
        ),
      },
      {
        Header: "Date du devut du contrat",
        accessor: "date_debut",
        width: 250,
        Cell: (props) => (
          <div className="cell">
            {props.value !== "undefined" ? props.value : ""}
          </div>
        ),
        Filter: ({ filter, onChange }) => (
          <div className="searchtable-container">
            <label htmlFor="date-input-date_debut">
              <SearchIcon className="searchtable-icon" />
            </label>

            <input
              type="text"
              id="date-input-date_debut"
              className="searchtable-input"
              onChange={(event) => onChange(event.target.value)}
              value={filter ? filter.value : ""}
            />
          </div>
        ),
      }
    ];

    if (this.props.IconsColumn) {
      columns.unshift({
        Header: "  ",
        accessor: "id",
        width: 100,
        sortable: false,
        filterable: false,
        Cell: (props) => {
          if (this.props.type === "corbeille") {
            return (
              <div className="cell">
                <IconButton
                  size="small"
                  onClick={() =>
                    this.props.undoDeleteEmployee(props.value)
                  }
                >
                  <UndoIcon className="black" fontSize="small"></UndoIcon>
                </IconButton>
              </div>
            );
          } else {
            return (
              <div className="cell">
            

                <IconButton
                  size="small"
                  onClick={() => this.add_To_Corbeille(props.value)}
                >
                  <DeleteIcon className="red" fontSize="small"></DeleteIcon>
                </IconButton>
                <IconButton size="small"
                onClick={() => this.modifier(props.original)}
                >
                 
                    <EditIcon className="black" fontSize="small"></EditIcon>
                 
                </IconButton>
              </div>
            );
          }
        },
      });
    }

    if (this.props.checkBoxColumn) {
      columns.unshift({
        Header: (
          <div
            style={{
              backgroundColor: "#E4E4E4",
              border: "1px solid rgba(0,0,0,0.45)",
            }}
          >
            <Checkbox
              key={"check-all-voiture-key"}
              id="check-all-voiture-id"
              style={{ padding: 3 }}
              checked={this.state.selectedAll}
              onChange={this.handleSelectAllChange}
              color="primary"
            />
          </div>
        ),
        sortable: false,
        filterable: false,
        accessor: "id",
        width: 50,

        Cell: (props) => (
          <div className="cell">
            <Checkbox
              value={props.value}
              key={`key-checkbox-table-voiture-${props.value}`}
              id={`id-checkbox-table-voiture-${props.value}`}
              onChange={(e) => this.handeleCheckCheckboxRow(e, props.value)}
              checked={this.checkRowIsSelected(props.value)}
              style={{ padding: 3 }}
            />
          </div>
        ),
      });
    }
    if (this.props.chooseOneColumn) {
      columns.unshift({
        Header: "  ",
        accessor: "id",
        width: 50,
        sortable: false,
        filterable: false,
        Cell: (props) => {
          return (
            <div className="cell">
              <input
                type="radio"
                name="select-voiture"
                checked={props.value === this.state.maitreDouvrageSelected.id}
                onChange={() => this.handleSelectOneChange(props.original)}
              />
            </div>
          );
        },
      });
    }

    return (
      <Fragment>
        <Dialog
          open={this.state.addToCorbeilleDialog}
          onClose={this.handleOpenCloseaddToCorbeilleDialog}
        >
          <h2>Supprimer</h2>
          <button
            onClick={() => {
              this.props.addToCorbeille(this.state.deletedId);
              this.handleOpenCloseaddToCorbeilleDialog();
            }}
          >
            Supprimer
          </button>
          <button onClick={this.handleOpenCloseaddToCorbeilleDialog}>
            Cancel
          </button>
        </Dialog>



        <Dialog
          open={this.state.modifierDialog}
          onClose={this.handleOpenCloseModifierDialog}
        maxWidth="xl"
       
        >
        
          


<div  style={{padding :  20}}>
<Paper style={{padding :  5}}>
   <ModifierEmployee employee={this.state.employee} sendData={this.getData} />
</Paper>
<DialogActions>
   <Button onClick={this.handleOpenCloseModifierDialog} color="primary" variant="contained">
            Cancel
          </Button>
</DialogActions>
    
         
</div>

       
        </Dialog>

     
        <div className="table-container">
          {/*
            recherche
            */}

          <ReactTable
            className="table"
            data={this.props.rows}
            filterable
            defaultFilterMethod={(filter, row) =>
              String(row[filter.id]) === filter.value
            }
            columns={columns}
            defaultPageSize={this.props.type === "choose-one" ? 5 : 8}
          />
        </div>
      </Fragment>
    );
  }
}

const mapActionToProps = (dispatch) => {
  return {
    addToCorbeille: (id) => dispatch(addToCorbeille(id)),
    
    undoDeleteEmployee: (id) => dispatch(undoDeleteEmployee(id)),
    getEmployee: (id) => dispatch(getEmployee(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.employee.loading,
    employee: state.employee.employee,
    
  };
};
export default connect(mapStateToProps, mapActionToProps)(EmployeeTable);
