import React, { Component } from 'react'




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
import { connect } from 'react-redux';

import { modifierUser , getUser} from '../store/actions/authAction'

 
 class User extends Component {
     state = {

     }

     componentDidMount(){
         this.props.getUser();
     }
     componentWillReceiveProps(nextProps){
         if(nextProps.user){
             this.setState({...nextProps.user})
         }
     }

    modifier = () =>{
        const data = {...this.state} ;

        this.props.modifierUser(data)
        }
        handleChange = (e)=>{
            this.setState({
                [e.target.name] : e.target.value
            })
        }
    render() {
        return (
            <div>
                
                <h1>Alarme</h1>
                <LoadingComponent
          loading={
            this.props.loading !== undefined ? this.props.loading : false
          }
        />

                <Grid container spacing={2} style={{padding : 10}}>
           
           <Grid item xs={12}>
        <h3 style={{ margin: 0 }}>Nom d'Utilisateur </h3>
      
        <TextField
              placeholder="Nom d'Utilisateur"
              value={this.state.username}
              name="username"
              variant="outlined"
              onChange={this.handleChange}
              fullWidth
            />

      </Grid>
      <Grid item xs={12}>
        <h3 style={{ margin: 0 }}>Mot de passe </h3>
    
        <TextField
              placeholder="Mot de passe"
              value={this.state.password}
              name="password"
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

const mapActionToProps = dispatch =>{
    return {
  
      modifierUser : (data)=>dispatch(modifierUser(data)),
      getUser : () => dispatch(getUser())
    }
  }
  

const mapStateToprops = (state) =>{
    return {
        user : state.auth.user,
        loading : state.auth.loading
    }
}
export default connect(mapStateToprops,mapActionToProps)(User);
