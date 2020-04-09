import React, {Fragment, Component, useContext, useState} from 'react';
import issueContext from '../context/issueContext';
import AuthContext from '../context/AuthContext'

const Add = (props)=> {
    const IssueContext= useContext(issueContext);
    const{addIssue,isAdded,reset}= IssueContext;
    const authContext = useContext(AuthContext);
const{ login, error, clearErrors, isAuthenticated} = authContext;
if(isAuthenticated!==true){
    props.history.push('/login');
}
  const[issue,setIssue]=useState({
    category: '',
    subject: '',
    statement: ''
  });
  const{category, subject, statement}= issue;
   const changeState = (e) =>{
    setIssue({
        ...issue,
        [e.target.id]: e.target.value
    })
   }
    const submit= (e) =>{
        e.preventDefault();
        console.log();
        addIssue({
            category,
            subject,
            statement
        })
        
        setIssue({
            category: '',
             subject: '',
            statement: ''
        })
            props.history.push('/');
    }
     return (
        <Fragment>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link>
                <div className="container">
            <h1 className="text-center">ADD GRIEVANCE</h1>
            <br/>
            <form onSubmit={submit}>
                <div className="form-group">
                <label htmlFor="category">Category</label>
                <select className="form-control" id="category" onChange={changeState} value={category}>
                    <option selected>Choose..</option>
                    <option>Academics</option>
                    <option>Infrastructure</option>
                    <option>Services</option>
                    <option>Others</option>
                </select>
                </div>

                <div className="form-group">
                <label htmlFor="subject">Subject:-</label>
                <textarea className="form-control" id="subject" rows="3" onChange={changeState} value={subject}></textarea>
                </div>

                <div className="form-group">
                <label htmlFor="statement">Brief Description:-</label>
                <textarea className="form-control" id="statement" rows="3" onChange={changeState} value={statement}></textarea>
                </div>

                <div className="form-group">
                {/* <label htmlFor="files">Attach Files (optional):-</label>
                <input type="file" className="form-control-file" id="files"/> */}
                </div>

                <br/>
                <button type="submit" className="btn btn-primary mb-2">Submit</button>


            </form>
            </div>
    </Fragment>
    )
}

export default Add;
