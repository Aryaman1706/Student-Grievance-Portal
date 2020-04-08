import React, { Fragment, useContext ,useState, useEffect} from 'react';
import AuthContext from '../context/AuthContext';

const Register = (props) => {
    const authContext = useContext(AuthContext);
    const { register, error, clearErrors, isAuthenticated} = authContext;
    useEffect(() =>{
        if(isAuthenticated){
            props.history.push('/');  //Redirecting the page to home page if authenticated
        }
        // if(error=== 'User already exists'){
        //     setAlert(error, 'danger');
        //     clearErrors();
        // }
        //eslint-disable-next-line
    },[ isAuthenticated,props.history])
    const [user,setUser]= useState({
        username: '',
        email: '',
        password: '',
        phone: ''
    })
    const{username, email, password, phone }= user;
    const onChange = (e) =>{
        setUser({...user, [e.target.id]:e.target.value})
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        console.log(user);
        if(username===''|| email===''|| password===''||phone===''){
            // setAlert('Please enter all details', 'danger')
        }
        else{
            register({
                username,
                email,
                password,
                phone
            })
        }
    }
    return (
        <Fragment>
        <div class="container">
    <div class="row">
        <div class="col s12">
          <div class="card grey lighten-1">
            <div class="card-content black-text">
              <span class="card-title center-align" style={{fontSize:'xxx-large', fontFamily: '"Anton", sans-serif'}}>SignUp</span>
              <br/>
              <p class="center-align">If you don't have an account already, create one here!</p>
              <form onSubmit={onSubmit}>
                <div class="input-field black-text">
                  <input type="text" id="username" onChange={onChange} required/>
                  <label class="active black-text" for="name">Name</label>
                </div>
                <div class="input-field">
                  <input type="email" id="email" class="validate" onChange={onChange} required/>
                  <label class="active black-text" for="email">Email</label>
                </div>
                <div class="input-field">
                    <input type="password" id="password" onChange={onChange} required/>
                    <label class="active black-text" for="password">Password</label>
                  </div>
                <div class="input-field">
                  <input type="tel" id="phone" class="validate" onChange={onChange} required/>
                  <label class="active black-text" for="phone">Phone Number</label>
                </div>
                <br/>
                <div class="center-align">
                <button class="btn waves-effect waves-light blue lighten-2 hoverable" type="submit" name="action">Create Account
                    <i class="material-icons right">check</i>
                  </button>
                </div>
              </form>
              <br/> <br/>
              <span>Already have an account? <a href="./login">Login</a> here!</span>
            </div>
          </div>
        </div>
      </div>
      </div>
      </Fragment>
    )
}

export default Register
