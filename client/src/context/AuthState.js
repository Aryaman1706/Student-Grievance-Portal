import React, {useReducer} from 'react';
import authContext from './AuthContext';
import authReducer from './authReducer';
import axios from 'axios';
import {REGISTER_SUCCESS,
    REGISTER_FAIL,
     USER_LOADED,
     AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
UPDATE_SUCCESS,
UPDATE_FAIL} from './types';
import setAuthToken from '../utils/SetAuthToken';


const AuthState = (props) =>{
    const initialState={
       token:localStorage.getItem('token'),
       isAuthenticated: null,
       loading:true,
       user:null,
       error:null
    };
    const [state, dispatch]= useReducer(authReducer,initialState);
    
    //Load User
     const loadUser = async () =>{
         //console.log(localStorage.token);
        if(localStorage.token){
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('/api/users/me');
            // console.log(res.data);
            dispatch({
                type: USER_LOADED, 
                payload: res.data 
            });
        } catch (err) {
            dispatch({ type: AUTH_ERROR})
        }
     }

    //Register User
    const register = async formData =>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try{
            const res = await axios.post('/api/users', formData, config);
            // console.log(res.data.token);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            // console.log(localStorage.token);
            loadUser();
        } catch(err){
            dispatch({
                type: REGISTER_FAIL,
              payload: err.response.data.msg
            })
        }
    }

    //Login User
    const login = async formData =>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try{
            const res = await axios.post('/api/auth', formData, config);
            // console.log(res.data);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            loadUser();
        } catch(err){
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            })
        }
    }
    //Update User
    const update = async formData =>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try{
            const res = await axios.put('/api/users/me', formData, config);
            // console.log(res.data.token);
            dispatch({
                type: UPDATE_SUCCESS,
                payload: res.data
            })
            // console.log(localStorage.token);
            loadUser();
        } catch(err){
            dispatch({
                type: UPDATE_FAIL,
              payload: err.response.data.msg
            })
        }
    }

    //Logout
    const logout = () => dispatch({type:LOGOUT })

    //Clear Errors
    const clearErrors = () => dispatch({type:CLEAR_ERRORS})

    return(
        <authContext.Provider 
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            clearErrors,
            loadUser,
            logout,
            login,
            update

         }}>
            {props.children}
        </authContext.Provider>
    );


};
export default AuthState;