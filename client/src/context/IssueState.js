import React, {useReducer} from 'react';
import issueContext from './issueContext';
import IssueReducer from './IssueReducer';
import axios from 'axios';
import {ADD_ISSUE, ISSUE_FAIL,RESET} from './types';


const IssueState = (props) =>{
    const initialState={
        issue:null,
        error: null,
        isAdded: null
    }
    const [state, dispatch]= useReducer(IssueReducer,initialState);
    // Add a Issue
    const addIssue = async formData =>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try{
            const res = await axios.post('/api/issues', formData, config);
            console.log(res.data);
            dispatch({
                type: ADD_ISSUE,
                payload: res.data
            })

        } catch(err){
            dispatch({
                type: ISSUE_FAIL,
              payload: err.response.data.msg
            })
        }
    }
    const reset = () =>{
        dispatch({
            type:RESET
        })
    }

    return(
        <issueContext.Provider 
        value={{
            issue:state.issue,
            error:state.error,
            isAdded: state.isAdded,
            addIssue,
            reset

         }}>
            {props.children}
        </issueContext.Provider>
    );


};
export default IssueState;