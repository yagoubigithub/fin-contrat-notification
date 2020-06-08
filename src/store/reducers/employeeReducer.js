const initStat = {
    error :null,
   
};
const employeeReducer = (state = initStat, action) =>{
    switch(action.type){

        case 'LOADING_EMPLOYEE' :
            return{
                ...state,
                loading : true
            }
       
        case 'STOP_LOADING_EMPLOYEE' :
            return {
                ...state,
                loading : false
            }
        case 'ERROR_EMPLOYEE' :
            return {
                ...state,
                error : action.payload
            }
            case 'AJOUTER_EMPLOYEE' :
                return {
                    ...state,
                    error : null,
                    employees : action.payload
                }
     
        default :
        return {
            ...state
        }

    }
    }
    export default employeeReducer;