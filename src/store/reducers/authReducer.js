const initStat = {
    error :null,
   
};
const authReducer = (state = initStat, action) =>{
    switch(action.type){

        case 'LOADING_AUTH' :
            return{
                ...state,
                loading : true
            }
        case 'MODIFIER_AUTH':
            return {
                ...state,
                error :null,
                user : action.payload
            }
        case 'STOP_LOADING_AUTH' :
            return {
                ...state,
                loading : false
            }
        case 'AUTH_ERROR' :
            return {
                ...state,
                error : action.payload
            }
        case "AUTH_SUCCESS" :
            return {
                ...state,
                error :null,
                user : {
                    username : action.payload.rows[0].username,
                    password : action.payload.rows[0].password
                },
                isDev : action.payload.isDev,
                direname : action.payload.direname
            }
        case 'GET_USER' : 

        return {
            ...state,
            error : null,
            user : action.payload.rows[0],
            direname : action.payload.direname
        }
        default :
        return {
            ...state
        }

    }
    }
    export default authReducer;