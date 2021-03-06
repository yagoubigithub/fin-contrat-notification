import React, { Component } from 'react'



//utils
import { getCurrentDateTime } from "../../utils/methods";



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

import {ajouterEmployee , removeEmployeeCreated} from '../../store/actions/employeeAction'

class AjouterEmployee extends Component {
    state = {
      error : "",
      success : "",
        nom : "",
        prenom : "",
        adresse :"",
        telephone :"",
        email : "",
        date_fin : "",
        date_debut : ""


    }
    componentWillReceiveProps(nextProps){
        if(nextProps.employeeCreated){
            this.setState({
              nom : "",
              prenom : "",
              adresse :"",
              telephone :"",
              email : "",
              date_fin : "",
              date_debut : "",

                success : "L'employé a été ajouté",
                error : ""
            })
            this.props.removeEmployeeCreated();
        }
    }
    ajouter = () => {
        const d = { ...this.state };
        if (d.nom.trim().length === 0) {
          this.setState({ error: "le champ nom et obligatoire *" });
          return;
        }
        if (d.date_fin.trim().length === 0) {
          this.setState({ error: "le champ Date de fin de contrat et obligatoire *" });
          return;
        }

        if (d.date_debut.trim().length === 0) {
          this.setState({ error: "le champ Date de début de contrat et obligatoire *" });
          return;
        }

        console.log(d)

      this.props.ajouterEmployee(d);


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
            
 <LoadingComponent
          loading={
            this.props.loading !== undefined ? this.props.loading : false
          }
        />

<div className="sous-nav-container">
        <h1 style={{color: "white", marginRight : 50}}>  Ajouter Employé</h1>
        </div>
        {this.state.error !== "" ?   <div className="alert error">{this.state.error} </div> : null}
        {this.state.success !== "" ?   <div className="alert success">{this.state.success} </div> : null}

            
       
               
            <Grid container spacing={2} style={{padding : 10,overflow : "auto"}}>
           
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
       

          <Grid item xs={6}>
            <h3 style={{ margin: 0 }}>date de début de contrat *</h3>
            <TextField
              placeholder="date de début de contrat *"
              value={
                this.state.date_debut === ""
                  ? getCurrentDateTime(new Date().getTime()).split("T")[0]
                  : getCurrentDateTime(
                      new Date(this.state.date_debut).getTime()
                    ).split("T")[0]
              }
              name="date_debut"
              variant="outlined"
              type="date"
              onChange={this.handleChange}
              fullWidth
            />
          </Grid>

          
          <Grid item xs={6}>
            <h3 style={{ margin: 0 }}>date de fin de contrat * </h3>
            <TextField
              placeholder="date de fin de contrat *"
              value={
                this.state.date_fin === ""
                  ? getCurrentDateTime(new Date().getTime()).split("T")[0]
                  : getCurrentDateTime(
                      new Date(this.state.date_fin).getTime()
                    ).split("T")[0]
              }
              name="date_fin"
              variant="outlined"
              type="date"
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
      ajouterEmployee: data => dispatch(ajouterEmployee(data)),
      removeEmployeeCreated :  ()=> dispatch(removeEmployeeCreated())
    };
  };
  const mapStateToProps = state => {
    
    return {
      loading: state.employee.loading,
      employeeCreated : state.employee.employeeCreated
    };
  };

export default connect(mapStateToProps,mapActionToProps) ( AjouterEmployee );