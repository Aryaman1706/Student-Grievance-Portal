import React, {useReducer} from 'react';
import alertContext from './alertContext';
import alertReducer from './AlertReducer';
import {v4 as uuid} from 'uuid';
import {REGISTER_SUCCESS,
    REGISTER_FAIL,
     USER_LOADED,
     AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    SET_ALERT,
    REMOVE_ALERT} from './types';


const AlertState = (props) =>{
    const initialState=[];
    const [state, dispatch]= useReducer(alertReducer,initialState);
    
   //Set Alert
   const setAlert = (msg, type, timeout=5000 ) =>{
    const id=uuid;
    dispatch({
        type:SET_ALERT,
        payload: {msg, type, id }
    });
    setTimeout(() =>dispatch({type: REMOVE_ALERT, payload: id}), timeout )
   }

    return(
        <alertContext.Provider 
        value={{
            alerts:state,
            setAlert

         }}>
            {props.children}
        </alertContext.Provider>
    );


};
export default AlertState;