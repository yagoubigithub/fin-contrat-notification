import React, { Component } from "react";

import ReactTable from "react-table";

export default class StaticTable extends Component {

    state = {
        defaultColumns : ["Nom", "Prénom" ,  "Adresse", "Télephone" , "Email", "Date de Début", "Date de fin"],
       
    }
  /*   handleSelectChange = (e) =>{
        const title = e.target.value;
        const defaultColumns = [...this.state.defaultColumns];
        const selectValue = defaultColumns[defaultColumns.indexOf(title)];
        defaultColumns.splice(defaultColumns.indexOf(title),1);
        this.setState({defaultColumns, selectValue})
    } */
  render() {
    const rows = this.props.rows;

    const columns = Object.keys(rows[0]).map((key) => {
      return {
        Header: key,
        accessor: key,
        width : 200,
        filterMethod: (filter, row) => {
        
          return true;
        },
        Cell: (props) => {
            if(props.value !== undefined){
               
                const render =  isNaN( Date.parse(props.value) ) ? props.value : props.value.toString().split('T')[0]
                return(
                    <div className="cell">
                      {props.value !== "undefined" ? render : ""}
                    </div>
                )
            }
            return(<div className="cell"></div>)
            
           
            
           
        },
        Filter: ({ filter, onChange }) => (
            <div className="searchtable-container">
            <select >
            <option value="0">Selectionner une titre</option>
                {this.state.defaultColumns.map((title, index)=>{
                    return(<option key={index} value={title}>{title}</option>)
                })}
            </select>
            </div>
          )


      };
    });
    return (
      <div >
        <ReactTable
          className="table"
          data={rows}
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
