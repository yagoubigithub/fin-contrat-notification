import {    combineReducers } from 'redux';

import authReducer from './authReducer';
import employeeReducer from './employeeReducer';
import alarmeReducer from './alarmeReducer';



const rootReducer  = combineReducers({
 
    auth : authReducer,
   employee :  employeeReducer,
   alarme :alarmeReducer,
   
   
  
    
});

export default rootReducer;