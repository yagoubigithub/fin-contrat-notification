import queryString from 'query-string';
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


export const _connect = ()=>{
  return (dispatch , getState)=>{
    dispatch({
      type : "LOADING_AUTH"
  })

  ipcRenderer.send("connect");
  
    
  ipcRenderer.once('connect', function (event,data) {

    if(data.isConnect){
      dispatch({
        type : "STOP_LOADING_AUTH"
    });
    }

  })

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


export const getLicence = () =>{
  return (dispatch,getState) =>{
    dispatch({
      type : "LOADING_AUTH"
  })
  ipcRenderer.send("licence", {});

  ipcRenderer.once('licence', function (event,data) {
   
    dispatch({
      type : "STOP_LOADING_AUTH"
  });
  if(data.key){
    dispatch({
        type : "GET_LICENCE",
        payload : data.key
    });
  }else{
    dispatch({
      type : "ERROR_AUTH_KEY",
      payload : data.error
  });
  }
});

  }
}

export const testKey = (key) =>{
  return (dispatch,getState) =>{
    dispatch({
      type : "LOADING_AUTH"
  })

  const data = { key : key };
  

  fetch('http://localhost:9093/atech-api/testKey.php', {
    method: 'POST', // or 'PUT'
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: queryString.stringify(data),
  })
  .then(response => { console.log(response.body);return response.text()})
  .then(data => {
   
    const obj = JSON.parse(data);
    
    if(obj.key){
     //add Key to data base
    
     ipcRenderer.send("licence:ajouter", {key :obj.key});

     ipcRenderer.once('licence:ajouter', function (event,data) {
      
       dispatch({
         type : "STOP_LOADING_AUTH"
     });
     if(data.key){
       dispatch({
           type : "ADD_KEY",
           payload : data.key
       });

     }else{
       dispatch({
         type : "ERROR_AUTH_KEY",
         payload : data
     });
     }
   });
    }else{
   
      dispatch({
        type : "STOP_LOADING_AUTH"
    });
    console.log(obj)
    dispatch({
      type : "ERROR_AUTH_KEY",
      payload : obj.error
  });

    }
  })
  .catch((error) => {
    dispatch({
      type : "ERROR_AUTH_KEY",
      payload : error
  });
  });
}
}