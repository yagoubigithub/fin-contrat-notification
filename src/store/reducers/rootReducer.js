import {    combineReducers } from 'redux';

import authReducer from './authReducer';
import employeeReducer from './employeeReducer';



const rootReducer  = combineReducers({
 
    auth : authReducer,
   employee :  employeeReducer,
   
   
  
    
});

export default rootReducer;