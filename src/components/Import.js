import React, { Component } from 'react'

import { Tab, Tabs } from "react-tabs-css";

import StaticTable from './tables/StaticTable'
import { Button } from '@material-ui/core';

export default class Import extends Component {
    
    import = () =>{

        if(Object.keys(this.state).length !== 0 ){
            Object.keys(this.state).map(key=>{
                this.props.ajouterMultiEmployee(this.state[key])
            })
        }
    }
    getData = (data) =>{
        
        const myState = {...this.state}
        myState[data.title] = {rowsSelected   : data.rowsSelected, choose : data.choose};

        this.setState({...myState},()=> console.log(this.state))

    }
    render() {
        let display = null;
        console.log(this.props.myFile)
        if(this.props.myFile !== [])
          display = this.props.myFile.map((file, index)=>
            <Tab style={{border :" 1px solid red"}} group="myFile" active={index === 0} key={index} index={`${index}-import`} title={file.name}>
          
          <StaticTable 
              sendData={this.getData} title={file.name} rows={file.array} head={file.head} />

           </Tab>)
        return (
            <div>
                  <Tabs style={{minHeight : 400}}>
               {
                   display
               }
                
            </Tabs>

            <Button onClick={this.import}>Import</Button>
            </div>
          
        )
    }
}
