import {ADD_ISSUE, ISSUE_FAIL,RESET} from './types';

    export default (state,action) => {
        switch(action.type){
            case ADD_ISSUE:
                return{
                    ...state,
                    issue: action.payload,
                    isAdded: true
                }
            case ISSUE_FAIL:
                return{
                    ...state,
                    error: action.payload,
                    isAdded:false
                }
            case RESET:
                return state;
            default:
                return state;
        }
    }