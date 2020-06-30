const electron = window.require("electron");
const {ipcRenderer}  = electron;

export const connexion = (data) =>{
    return (dispatch ,getState)=>{

      dispatch({
        type : "LOADING_AUTH"
    })
    ipcRenderer.send("user", {...data});
    
    ipcRenderer.once('user', function (event,data) {
      dispatch({
        type : "STOP_LOADING_AUTH"
    });
   
    if(data.rows[0] !== undefined){
      dispatch({
        type : "AUTH_SUCCESS",
        payload : data
    });
    }else{
      dispatch({
        type : "AUTH_ERROR",
        payload : "username ou mot de passe invalid"
    });
    }
      
    });
   
    
     
    }
}


export const getUser = () =>{
  return (dispatch ,getState)=>{

    dispatch({
      type : "LOADING_AUTH"
  })
  ipcRenderer.send("user", {});

  ipcRenderer.once('user', function (event,data) {
   
    dispatch({
      type : "STOP_LOADING_AUTH"
  });dispatch({
    type : "STOP_LOADING_AUTH"
});
  if(Array.isArray(data.rows)){
    dispatch({
        type : "GET_USER",
        payload : data
    });
  }else{
    dispatch({
      type : "ERROR_AUTH",
      payload : data
  });
  }
});
  }
}
export const modifierUser  = (data) =>{
  return (dispatch,getState) =>{
    dispatch({
      type : "LOADING_AUTH"
  })
  ipcRenderer.send("auth:modifier", {...data});

  ipcRenderer.once('auth:modifier', function (event,data) {
   
    dispatch({
      type : "STOP_LOADING_AUTH"
  });dispatch({
    type : "STOP_LOADING_AUTH"
});
  if(Array.isArray(data)){
    dispatch({
        type : "MODIFIER_AUTH",
        payload : data[0]
    });
  }else{
    dispatch({
      type : "ERROR_AUTH",
      payload : data
  });
  }
});

  
  }
}
