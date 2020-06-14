import React, { Component } from 'react'

export default class Import extends Component {
    componentDidMount(){
        console.log(this.props.myFile)
    }
    render() {
        return (
            <div>
                {
                    Object.keys(this.props.myFile).map(key=>
                    <p>{key}</p>)
                }
                
            </div>
        )
    }
}
