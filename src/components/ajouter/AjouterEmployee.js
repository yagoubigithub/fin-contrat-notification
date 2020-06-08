import React, { Component } from 'react'



//Mui
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";




//icons

import SaveIcon from "@material-ui/icons/Save";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

import LoadingComponent from "../../utils/loadingComponent";


//redux
import { connect } from "react-redux";

import {ajouterEmployee} from '../../store/actions/employeeAction'

class AjouterEmployee extends Component {
    state = {
        nom : "",
        prenom : "",
        adresse :"",
        telephone :"",
        email : "",


    }
    ajouter = () => {
        const d = { ...this.state };
        if (d.nom.trim().length === 0) {
          this.setState({ error: "le champ nom et obligatoire *" });
          return;
        }

        console.log(d)


    }
    handleDateChange = (date_naissance)=>{
        this.setState({date_naissance})
    }
    handleChange = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render() {
        return (
            <div>
              <div className="alert error">{this.state.error} </div>
        <div className="alert success">{this.state.success} </div>
               
            <Grid container spacing={2} style={{padding : 10}}>
           
               <Grid item xs={6}>
            <h3 style={{ margin: 0 }}>Nom * </h3>

            <TextField
              placeholder="Nom *"
              value={this.state.nom}
              name="nom"
              variant="outlined"
              onChange={this.handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <h3 style={{ margin: 0 }}>Prénom </h3>
            <TextField
              placeholder="Prénom"
              value={this.state.prenom}
              name="prenom"
              variant="outlined"
              onChange={this.handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <h3 style={{ margin: 0 }}>Adresse </h3>
            <TextField
              placeholder="Adresse"
              value={this.state.adresse}
              name="adresse"
              variant="outlined"
              onChange={this.handleChange}
              fullWidth
            />
          </Grid>


          <Grid item xs={12}>
            <h3 style={{ margin: 0 }}>Email </h3>
            <TextField
              placeholder="Email"
              value={this.state.email}
              name="email"
              variant="outlined"
              onChange={this.handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <h3 style={{ margin: 0 }}>télephone </h3>
            <TextField
              placeholder="télephone"
              value={this.state.telephone}
              name="telephone"
              variant="outlined"
              onChange={this.handleChange}
              fullWidth
            />
          </Grid>
       
          <Grid item xs={12}>
            <br />
            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={this.ajouter}
            >
              <SaveIcon />
            </Button>
          </Grid>
            </Grid>
            </div>
        )
    }
}


const mapActionToProps = dispatch => {
    return {
      ajouterEmployee: data => dispatch(ajouterEmployee(data))
    };
  };
  const mapStateToProps = state => {
    
    return {
      loading: state.employee.loading,
    };
  };

export default connect(mapStateToProps,mapActionToProps) ( AjouterEmployee );