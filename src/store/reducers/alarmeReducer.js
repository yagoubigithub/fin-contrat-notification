const initStat = {
    error :null,
   
};
const alarmeReducer = (state = initStat, action) =>{
    switch(action.type){

        case 'LOADING_ALARME' :
            return{
                ...state,
                loading : true
            }
        case 'MODIFIER_ALARME':
            return {
                ...state,
                error :null,
                alarme : action.payload
            }
        case 'STOP_LOADING_ALARME' :
            return {
                ...state,
                loading : false
            }
        case 'ALARME_ERROR' :
            return {
                ...state,
                error : action.payload
            }

         case 'GET_ALARME' :
               return {
                   ...state,
                   alarme :action.payload
               } 
       
        default :
        return {
            ...state
        }

    }
    }
    export default alarmeReducer;