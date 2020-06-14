
const electron = window.require("electron");
const {ipcRenderer}  = electron;

export const modifierAlarme = (data) =>{
    return (dispatch ,getState)=>{

        dispatch({type :  "LOADING_ALARME"})


        ipcRenderer.send("alarme:modifer", {...data});
    
        ipcRenderer.once("alarme:modifer", function (event,data) {
            console.log(data)
          dispatch({
            type : "STOP_LOADING_ALARME"
        });
       
        if(data[0] !== undefined){

            dispatch({type: "MODFIER_ALARME",  action : data[0]})
        }else{
            dispatch({
                type : "ALARME_ERROR",
                payload : data
            });
        }


        })
    }
}



export const getAlarme = () =>{
    return (dispatch ,getState)=>{

        dispatch({type :  "LOADING_ALARME"})


        ipcRenderer.send("alarme", {});
    
        ipcRenderer.once('alarme', function (event,data) {
          dispatch({
            type : "STOP_LOADING_ALARME"
        });
        if(data[0] !== undefined){
            

            dispatch({type: "GET_ALARME",  payload : data[0]})
        }else{
            dispatch({
                type : "ALARME_ERROR",
                payload : data
            });
        }


    })
    


    }
}