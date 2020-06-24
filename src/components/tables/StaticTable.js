import React, { Component } from "react";

import ReactTable from "react-table";

//Mui

import Checkbox from '@material-ui/core/Checkbox'


export default class StaticTable extends Component {
  state = {
    exportBtn : false,
    defaultColumns: [
      "Nom",
      "Prénom",
      "Adresse",
      "Télephone",
      "Email",
      "Date de Début",
      "Date de fin",
    ],
    choose: [],
    selectValue: {},
    rows : [],
    selectedAll : false,
    rowsSelected : []
  };


  handleSelectAllChange = (e) =>{
    if(this.state.selectedAll){
      this.setState({
        selectedAll : false,
        rowsSelected : []
      }, () => {
        this.props.sendData({rowsSelected : [],title : this.props.title , choose : this.state.choose });
      })
      return;
    }
    const rowsSelected= [... this.props.rows]

    this.setState({
      selectedAll : true,
      rowsSelected 
    },  () => {
      this.props.sendData({rowsSelected,title : this.props.title , choose : this.state.choose });
    })



  }
 

  handeleCheckCheckboxRow = (e, row) => {
    const rowsSelected = [...this.state.rowsSelected];
    if (this.checkRowIsSelected(row.id)) {
      console.log("is selected")
      //unselect
      rowsSelected.splice(
        rowsSelected.findIndex((item) => row.id == item.id),
        1
      );
    } else {
      //select
      rowsSelected.push(row);
    }

    if (rowsSelected.length === 0) this.setState({ selectedAll: false });
    this.setState({ rowsSelected }, () => {
      this.props.sendData({rowsSelected,title : this.props.title, choose :  this.state.choose});
    });
  }

  checkRowIsSelected = (id) => {
    const rowsSelected = [...this.state.rowsSelected];
    return rowsSelected.filter((row) => row.id == id).length > 0;
  };
  
  handleSelectChange = (e, key) => {
    e.preventDefault();
    const title = e.target.value;
    
    const choose = [...this.state.choose];
    const selectValue = { ...this.state.selectValue };

    if(this.ifTitleExist(selectValue,title)){
      return;
    }else{
      const index = choose.findIndex(function (value) {
        return value.title === title;
      });
      if (index !== -1) {
        choose.splice(index, 1);
      }
      choose.push({
        title,
        key,
      });
  
      selectValue[key] = title;
  
      this.setState({ choose, selectValue } , ()=>{
        this.props.sendData({rowsSelected : this.state.rowsSelected , title : this.props.title, choose });
      });
      console.log(choose)
  
      
    }
  
  };
  ifTitleExist = (selectValue,title) =>{

    let exist = false;
    Object.keys(selectValue).map(key=>{
      if(selectValue[key] === title){
        exist = true;
        return;
      }

    })

    return exist;
  }
  render() {
   

    const columns = this.props.head.map((key) => {
      return {
        Header: key,
        accessor: key,
        width: 200,
        filterMethod: (filter, row) => {
          return true;
        },
        Cell: (props) => {
          if (props.value !== undefined) {
            const render = isNaN(Date.parse(props.value))
              ? props.value
              : props.value.toString().split("T")[0];
            return (
              <div className="cell">
                {props.value !== "_Empty" ? render : ""}
              </div>
            );
          }
          return <div className="cell"></div>;
        },
        Filter: ({ filter, onChange }) => {
          return (
            <div className="searchtable-container">
              <select
                onChange={(e) => this.handleSelectChange(e, key)}
                value={this.state.selectValue[key]}
              >
                <option value="0">Selectionner une titre</option>
                {this.state.defaultColumns.map((title, index) => {
                  return (
                    <option key={index} value={title}>
                      {title}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        },
      };
    });

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
        <div className={`cell `}>
          <Checkbox
            value={props.value}
            key={`key-checkbox-table-voiture-${props.value}`}
            id={`id-checkbox-table-voiture-${props.value}`}
            onChange={(e) => this.handeleCheckCheckboxRow(e, props.original)}
            checked={this.checkRowIsSelected(props.value)}
            style={{ padding: 3 }}
          />
        </div>
      ),
    });
    return (
      <div>
        <ReactTable
          className="table"
          data={this.props.rows}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value
          }
          columns={columns}
          defaultPageSize={5}
        />
       
      </div>
    );
  }
}
