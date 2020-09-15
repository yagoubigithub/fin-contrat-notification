import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

//redux
import {connect} from "react-redux";
import {connexion,_connect,getLicence, testKey} from '../../store/actions/authAction'


import logo from '../../logo'

import LoadingComponent from "../../utils/loadingComponent";
//Mui
import Dialog from '@material-ui/core/Dialog'
import TaskBar from '../TaskBar';

 class Connexion extends Component {
   
    state= {
        username : "",
        password :  "",
        key : "", 
        error : "",
        error_key  : "",
        key_entred : ""
    }
    componentWillMount = ()=>{
        this.props.getLicence()
    }
    
     componentWillReceiveProps(nextProps){
       
        if(nextProps.auth.key){
            this.setState({key : nextProps.auth.key});
            
          }
          if(nextProps.error){
            this.setState({error : nextProps.error})
          }
          if(nextProps.error_key){
            this.setState({error_key : nextProps.error_key})
          }
        if(nextProps.auth.user !== undefined){
            
            const { history } = this.props;
            if (history) history.push('/employees');
        }
    }
    handleChange=(e) =>{
        this.setState({[e.target.name] : e.target.value})
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        const  username = this.state.username ? this.state.username : "";
        const password = this.state.password ? this.state.password : "";
        this.props.connexion({ username,password});
    }
    testKey = (e) =>{
        e.preventDefault();
        const key = this.state.key_entred;
        if(key.length > 0){
            this.props.testKey(key)
        }
    }
    render() {
        return (
            <Dialog fullScreen open={true}>
       { /*
        <Dialog fullScreen open={this.state.key.length === 0}>
        <TaskBar />
        <div className="key-container">
   <h1> La clé de la license</h1>
        <form onSubmit={this.testKey} style={{textAlign : "center"}}>
        {this.state.error_key !== "" && this.state.error_key !== "Enter Key" ? <div className="error">{this.state.error_key}</div> : null}
        
          
               <input className="input-auth"   onChange={this.handleChange} name="key_entred"  type="text" placeholder="Clé" />
               <br />
               <input type="submit" className="button-auth" value="Valider"/>
             
        </form>
        </div>
     
          
        </Dialog>
      */ }
            <TaskBar/>
     <div> 
     <img src={logo} width="300" height="300" style={{display : "block",margin : "auto", marginTop : 50}}/>
          
          <div className="container-auth">
           <form onSubmit={this.handleSubmit} className="form-auth">
               <div className="error-auth">{this.props.auth.error !== "Enter Key" && this.props.auth.error}</div>
               <input className="input-auth" onChange={this.handleChange} name="username" type="text" placeholder="Nom d'utilisateur" />
               <input className="input-auth"   onChange={this.handleChange} name="password" type="password" placeholder="Mot de passe" />
               <input type="submit" className="button-auth" value="Connexion"/>
               
           </form>  
            
       </div>
    
       <LoadingComponent loading={this.props.loading !== undefined ? this.props.loading : false} />
       </div>
  
  
            </Dialog>
       
       )
    }

}
const mapActionToProps = dispatch =>{
    return {
        connexion  : (data) => dispatch(connexion(data)),
        connect : ()=>dispatch(_connect()),
        getLicence : ()=>dispatch(getLicence()),
        testKey : (key) =>dispatch(testKey(key))
    }
}
const mapStateToProps = state =>{
   
    return {
        auth : state.auth,
        loading : state.auth.loading,
        error_key: state.auth.error_key,
       
    }
}

export default connect(mapStateToProps,mapActionToProps)(withRouter(Connexion));

