import React, { Component } from 'react'



//utils
import { getCurrentDateTime } from "./../utils/methods";



//Mui

import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select'


//icons

import SaveIcon from "@material-ui/icons/Save";


import LoadingComponent from "./../utils/loadingComponent";


//redux
import { connect } from "react-redux";
export default class alarme extends Component {
    state = {
        repeter : "jours",
        son : "railroad_crossing_bell-Brylon_Terry-1551570865.mp3"
    }

    handleChange = (e)=>{
        
        this.setState({[e.target.name] : e.target.value})
    }
    render() {
        return (
            <div>
                
                <h1>Alarme</h1>

                <Grid container spacing={2} style={{padding : 10}}>
           
           <Grid item xs={12}>
        <h3 style={{ margin: 0 }}>Répéter </h3>
        <Select value={this.state.repeter} name="repeter" fullWidth variant="outlined" onChange={this.handleChange}>
        <MenuItem value={"jours"}>Tous les jours</MenuItem>
        <MenuItem value={"heurs"}>Tous les heurs</MenuItem>
       
        </Select>

      </Grid>
      <Grid item xs={6}>
        <h3 style={{ margin: 0 }}>Son </h3>
    
        <Select value={this.state.son} name="son" fullWidth variant="outlined" onChange={this.handleChange}>
        <MenuItem value={"railroad_crossing_bell-Brylon_Terry-1551570865.mp3"}>Railroad Crossing Bell Sound</MenuItem>
        <MenuItem value={"Red Alert-SoundBible.com-108009997.mp3"}>Red Alert Sound</MenuItem>
       
        </Select>
        
      </Grid>

      <Grid item xs={12}>
            <br />
            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={this.modifier}
            >
              <SaveIcon />
            </Button>
          </Grid>


</Grid>

            </div>
        )
    }
}
