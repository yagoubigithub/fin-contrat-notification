import React, { Component } from "react";

import ReactTable from "react-table";

//Mui



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
    rows : []
  };

  componentWillMount(){
  
  }
  
  handleSelectChange = (e, key) => {
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
  
      this.setState({ choose, selectValue });
  
      console.log(choose);
    }
  
  };
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
