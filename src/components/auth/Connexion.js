import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

//redux
import {connect} from "react-redux";
import {connexion,_connect} from '../../store/actions/authAction'


import logo from '../../logo'

import LoadingComponent from "../../utils/loadingComponent";
//Mui
import Dialog from '@material-ui/core/Dialog'
import TaskBar from '../TaskBar';

 class Connexion extends Component {
   
    state= {
        username : "",
        password :  ""
    }
    componentWillMount = ()=>{
        //this.props.connect()
    }
    
     componentWillReceiveProps(nextProps){
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
    render() {
        return (
            <Dialog fullScreen open={true}>
            <TaskBar/>
     <div> 
     <img src={logo} width="300" height="300" style={{display : "block",margin : "auto", marginTop : 50}}/>
          
          <div className="container-auth">
           <form onSubmit={this.handleSubmit} className="form-auth">
               <span className="error-auth">{this.props.auth.error}</span>
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
        connect : ()=>dispatch(_connect())
    }
}
const mapStateToProps = state =>{
    return {
        auth : state.auth,
        loading : state.auth.loading
    }
}

export default connect(mapStateToProps,mapActionToProps)(withRouter(Connexion));

