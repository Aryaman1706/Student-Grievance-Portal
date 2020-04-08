import React, {Fragment, useEffect, useState, useContext} from 'react';
import AuthContext from '../context/AuthContext';
import alertContext from '../context/alertContext'

const Login = (props)=> {
    const authContext = useContext(AuthContext);
    const AlertContext = useContext(alertContext);
    const{ login, error, clearErrors, isAuthenticated} = authContext;
    const{setAlert}= AlertContext;
    useEffect(() =>{
        if(isAuthenticated){
            props.history.push('/');  //Redirecting the page to home page if authenticated
        }
        if(error=== 'Invalid email or password.'){
            setAlert(error, 'danger');
            clearErrors();
        }
        //eslint-disable-next-line
    },[isAuthenticated, props.history])
    const [user,setUser]= useState({
        email: '',
        password: ''
    })
    const{email, password }= user;
    const onChange = (e) =>{
        setUser({...user, [e.target.id]:e.target.value})
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        // if(email==='' || password===''){
        //     setAlert('Please fill in all the fields', 'danger')
        // }
        // else{
            login({
                email,
                password
            });
        // }
    }
    return (
        <Fragment>
        <div class="container">
    <div class="row">
        <div class="col s12">
          <div class="card grey lighten-1">
            <div class="card-content black-text">
            <span className="card-title center-align" style={{fontSize: 'xxx-large', fontFamily: '"Anton", sans-serif'}}>Login</span>
              <br/>
              <p class="center-align">Fill the login details.</p>
              <form onSubmit={onSubmit}> 
                <div class="input-field">
                  <input type="email" id="email" class="validate" required onChange={onChange}/>
                  <label class="active black-text" for="email">Email</label>
                </div>
                <div class="input-field">
                    <input type="password" id="password" required onChange={onChange}/>
                    <label class="active black-text" for="password">Password</label>
                  </div>
                <div class="center-align">
                  <button class="btn waves-effect waves-light blue lighten-2 hoverable" type="submit" name="action">Login
                    <i class="material-icons right"></i>
                  </button>
                </div>
               
              </form>
              <br/>
              <br/>
              <span>Don't have an account? <a href="./register">SignUp</a> here!</span>

            </div>
          </div>
        </div>
      </div>
      </div>
      </Fragment>
    )
}
export default Login;