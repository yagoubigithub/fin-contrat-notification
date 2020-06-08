const electron = window.require("electron");
const {ipcRenderer}  = electron;



export const ajouterEmployee  = (data) =>{
    return (dispatch,getState) =>{
      dispatch({
        type : "LOADING_EMPLOYEE"
    })
    ipcRenderer.send("employee:ajouter", {...data});
  
    ipcRenderer.once('employee:ajouter', function (event,data) {
     
      dispatch({
        type : "STOP_LOADING_EMPLOYEE"
    });dispatch({
      type : "STOP_LOADING_EMPLOYEE"
  });
    if(Array.isArray(data)){
      dispatch({
          type : "AJOUTER_EMPLOYEE",
          payload : data[0]
      });
    }else{
      dispatch({
        type : "ERROR_EMPLOYEE",
        payload : data
    });
    }
  });
  
    
    }
  }