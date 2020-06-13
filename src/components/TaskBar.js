import React, { Component } from 'react'

export default class TaskBar extends Component {

    close  = () =>{
        
const electron = window.require("electron");
const {ipcRenderer}  = electron;

ipcRenderer.send('closeWindow')
    }
    render() {
        return (
            <div style={{position : "fixed",zIndex : 99, backgroundColor : "black", width : "100%", height: 30, textAlign : "right"}}>
           
            <nav>

<button id="close-btn" onClick={this.close} style={{backgroundColor : "red", cursor : "pointer", margin : 3}}>

    <img src="assets/baseline_close_white_18dp.png" width="20" height="20" />
</button>
</nav>
                
            </div>
        )
    }
}