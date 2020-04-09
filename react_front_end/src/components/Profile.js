import React, { useContext,Fragment, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import SetAuthToken from '../utils/SetAuthToken';
if(localStorage.token){
    SetAuthToken(localStorage.token);
  }

const Profile = (props) =>{
    const authContext= useContext(AuthContext);
    const {isAuthenticated, logout, user,loadUser,update} = authContext;
    loadUser();
   // console.log(user);
    const[profile,setProfile]=useState({
        username: `Lorem`,
               email: `lorem@gmail.com`,
               phone: '1234567890',
        password:'1234567890',
        Confirm:'1234567890'
    })
    const{username,email,phone,password,Confirm}=profile;
    useEffect(()=>{
        if(user){
            setProfile({
               ...profile ,
               username: `${user.username}`,
               email: `${user.email}`,
               phone: `${user.phone}`
            })
        }
    },user,profile)
    const onChange = (e) =>{
        setProfile({
            ...profile,
            [e.target.id]: e.target.value
        })
    }
   const onSubmit = (e) =>{
        e.preventDefault();
        update({
          username,
          email,
            password,
            phone
        });
        props.history.push('/');
    }

        return (
            
            <Fragment>
            <div className="container">
                <div className="row">
             <h1 className="center-align">Profile</h1>
            <form className="col s12" onSubmit={onSubmit}>
              <div className="row">
                <div className="col s8 offset-s2">
                <label htmlFor="name">Name:</label>
                  <input value={username} id="username" type="text" className="validate" onChange={onChange} required/>
                  </div>
                  <div className="col s8 offset-s2">
                    <label htmlFor="name">Email:</label>
                    <input value={email} id="email" type="email" className="validate" onChange={onChange} required/>
                    </div>
                    <div className="col s8 offset-s2">
                    <label htmlFor="name">Phone Number:</label>
                    <input value={phone} id="phone" type="tel" className="validate" onChange={onChange} required/>
                    </div>
                    <div className="col s8 offset-s2">
                    <label htmlFor="name">Password:</label>
                    <input value={password} id="password" type="password" className="validate" onChange={onChange} required/>
                    </div>
                    <div className="col s8 offset-s2">
                    <label htmlFor="name">Confirm Password:</label>
                    <input value={Confirm} id="Confirm" type="password" className="validate" onChange={onChange} required/>
                    </div>
                    <div className="col s8 offset-s2" style={{marginTop: '10px'}}>
                    <button className="btn waves-effect waves-light" type="submit" name="action">Save Changes
                    <i className="material-icons right">check</i>
                    </button>
                    </div>
                    
                    </div>
                    </form>
                    </div>
                    </div>
                    </Fragment>
        )
    }


export default Profile
