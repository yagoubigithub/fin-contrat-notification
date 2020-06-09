import React, { Component } from 'react'



//utils
import { getCurrentDateTime } from "../../utils/methods";



//Mui

import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";




//icons

import SaveIcon from "@material-ui/icons/Save";


import LoadingComponent from "../../utils/loadingComponent";


//redux
import { connect } from "react-redux";

import {modifierEmployee , removeEmployeeEdited} from '../../store/actions/employeeAction'

class ModifierEmployee extends Component {
    state = {
    


    }
    componentDidMount(){
        this.setState({...this.props.employee})
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.employeeEdited){
            //send data
            this.props.removeEmployeeEdited();
            this.props.sendData({employeeEdited : true})
        }

       
    }
    modifier = () => {
        const d = { ...this.state };
        if (d.nom.trim().length === 0) {
          this.setState({ error: "le champ nom et obligatoire *" });
          return;
        }
        if (d.date_fin.trim().length === 0) {
          this.setState({ error: "le champ Date du fin du contrat et obligatoire *" });
          return;
        }

        if (d.date_debut.trim().length === 0) {
          this.setState({ error: "le champ Date du debut du contrat et obligatoire *" });
          return;
        }

        console.log(d)

      this.props.modifierEmployee(d);


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

              <div className="alert error">{this.state.error} </div>
        <div className="alert success">{this.state.success} </div>
               
            <Grid container spacing={1}>
           
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

          <Grid item xs={6}>
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


          <Grid item xs={6}>
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
            <h3 style={{ margin: 0 }}>date du debut du contrat *</h3>
            <TextField
              placeholder="date du debut du contrat *"
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
            <h3 style={{ margin: 0 }}>date du fin du contrat * </h3>
            <TextField
              placeholder="date du fin du contrat *"
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


const mapActionToProps = dispatch => {
    return {
      modifierEmployee: data => dispatch(modifierEmployee(data)),
      removeEmployeeEdited :  ()=> dispatch(removeEmployeeEdited())
    };
  };
  const mapStateToProps = state => {
    
    return {
      loading : state.employee.loading,
      employeeEdited : state.employee.employeeEdited
    };
  };

export default connect(mapStateToProps,mapActionToProps) ( ModifierEmployee );