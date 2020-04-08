import {SET_ALERT, REMOVE_ALERT} from './types';



export default (state,action) =>{
    switch(action.type){
        default:
            return state;
        case SET_ALERT:
            return[...state, action.payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id!== action.payload)
    }
};