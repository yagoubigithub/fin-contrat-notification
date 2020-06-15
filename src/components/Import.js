import React, { Component } from 'react'

import { Tab, Tabs } from "react-tabs-css";

import StaticTable from './tables/StaticTable'

export default class Import extends Component {
    componentDidMount(){
        console.log(this.props.myFile)
    }
    render() {
        const display =  Object.keys(this.props.myFile).map((key, index)=>
            <Tab  group="myFile" key={index} index={index} title={key}>
            <StaticTable rows={this.props.myFile[key]} />

            </Tab>)
        return (
            <Tabs>
               {display}
                
            </Tabs>
        )
    }
}
