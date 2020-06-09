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
                    employees : action.payload,
                    employeeCreated : true,
                }
             case 'REMOVE_EMPLOYEE_CREATED':
                    return {
                        ...state,
                        employeeCreated : false
            }
            case 'READ_ONE_EMPLOYEE' :
                return {
                    ...state,
                    error : null,
                    employee : action.payload
                }
            case 'ADD_TO_CORBEILLE_EMPLOYEE' :
                return {
                    ...state,
                    employees : action.payload
                }

            case 'UNDO_DELETE_EMPLOYEE' :

            return {
                ...state,
                employees : action.payload
            }
     
        default :
        return {
            ...state
        }

    }
    }
    export default employeeReducer;