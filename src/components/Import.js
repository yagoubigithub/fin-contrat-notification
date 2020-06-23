import React, { Component } from 'react'

import { Tab, Tabs } from "react-tabs-css";

import StaticTable from './tables/StaticTable'
import { Button } from '@material-ui/core';

export default class Import extends Component {
    
    componentDidMount(){
        
    }
    getData = (data) =>{
        console.log( data )
        const myState = {...this.state}
        myState[data.title] = data.rowsSelected;

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

            <Button>Import</Button>
            </div>
          
        )
    }
}
