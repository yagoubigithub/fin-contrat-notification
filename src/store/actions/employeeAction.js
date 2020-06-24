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
          payload : data
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



  
//delete (mettre dans le corbeille)
export const addToCorbeille = (id) =>{
  return (dispatch , getState)=>{

    dispatch({
      type : "LOADING_EMPLOYEE"
  })
  ipcRenderer.send("employee:delete", {id, status :  "corbeille"});

  ipcRenderer.once('employee:delete', function (event,data) {
   
    dispatch({
      type : "STOP_LOADING_EMPLOYEE"
  });
  if(Array.isArray(data)){
    dispatch({
        type : "ADD_TO_CORBEILLE_EMPLOYEE",
        payload : data
    });
  }else{
    dispatch({
      type : "ERROR_EMPLOYEE",
      payload :data
  });
  }
});
    

  }
}



 
export const getAllEmployee = () =>{
  return (dispatch ,getState)=>{

    
    dispatch({
      type : "LOADING_EMPLOYEE"
  })
  ipcRenderer.send("employee", {});

  
  ipcRenderer.once('employee', function (event,data) {
    dispatch({
      type : "STOP_LOADING_EMPLOYEE"
  });
 
  if(Array.isArray(data)){
    dispatch({
        type : "READ_ALL_EMPLOYEE",
        payload : data
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


//undo delete
export const undoDeleteEmployee = (id) =>{
  return (dispatch ,getState)=>{

    dispatch({
      type : "LOADING_EMPLOYEE"
  })
  ipcRenderer.send("employee:delete", {id, status :  "undo"});

  ipcRenderer.once('employee:delete', function (event,data) {
   
    dispatch({
      type : "STOP_LOADING_EMPLOYEE"
  });
  if(Array.isArray(data)){
    dispatch({
        type : "UNDO_DELETE_EMPLOYEE",
        payload : data
    });
  }else{
    dispatch({
      type : "ERROR_EMPLOYEE",
      payload :data
  });
  }
});

  }
}


  export const removeEmployeeCreated = () =>{
    return (dispatch,getState) =>{
      dispatch({
        type : "REMOVE_EMPLOYEE_CREATED"
    })

  }
  }


  export const getEmployee = (id) =>{

    return ( dispatch , getState) => {
      dispatch({
        type : "LOADING_EMPLOYEE"
    })
    ipcRenderer.send("employee", {id});
  
    
    ipcRenderer.once('employee', function (event,data) {
      dispatch({
        type : "STOP_LOADING_EMPLOYEE"
    });
   
    if(Array.isArray(data)){
      dispatch({
          type : "READ_ONE_EMPLOYEE",
          payload : data[0]
      });
    }
    else{
      dispatch({
        type : "ERROR_EMPLOYEE",
        payload : data
    });
    }
  });
  
    }
  }



  export const modifierEmployee  = (data) =>{
    return (dispatch,getState) =>{
      dispatch({
        type : "LOADING_EMPLOYEE"
    })
    ipcRenderer.send("employee:modifier", {...data});
  
    ipcRenderer.once('employee:modifier', function (event,data) {
     
      dispatch({
        type : "STOP_LOADING_EMPLOYEE"
    });dispatch({
      type : "STOP_LOADING_EMPLOYEE"
  });
    if(Array.isArray(data)){
      dispatch({
          type : "MODIFIER_EMPLOYEE",
          payload : data
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

  
  export const removeEmployeeEdited = () =>{
    return (dispatch,getState) =>{
      dispatch({
        type : "REMOVE_EMPLOYEE_EDITED"
    })

  }
  }

  export const readFile  = (path) =>{
    return (dispatch,getState) =>{
      dispatch({
        type : "LOADING_EMPLOYEE"
    })
    ipcRenderer.send("employee:readFile", {path});
  
    ipcRenderer.once('employee:readFile', function (event,data) {
     
      dispatch({
        type : "STOP_LOADING_EMPLOYEE"
    });
   
    if(data){
      dispatch({
          type : "READ_FILE_EMPLOYEE",
          payload : data
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

  export const removeMyFile = ()=>{
    return (dispatch, getState)=>{
      dispatch({
        type : "REMOVE_MY_FILE"
      })

    }
  }


  export const _export  = () =>{
    return (dispatch , getState)=>{
      dispatch({
        type : "LOADING_EMPLOYEE"
    })
    ipcRenderer.send("employee:export", {});
  
    ipcRenderer.once('employee:export', function (event,data) {
     
      dispatch({
        type : "STOP_LOADING_EMPLOYEE"
    });
   
    if(data){
      dispatch({
          type : "EXPORT_EMPLOYEE",
          payload : data
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